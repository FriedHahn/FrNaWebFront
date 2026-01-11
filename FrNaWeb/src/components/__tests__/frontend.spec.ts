// src/components/__tests__/frontend.spec.ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { mount } from "@vue/test-utils"

function flushPromises() {
  return new Promise<void>((resolve) => queueMicrotask(() => resolve()))
}

async function importFreshAuth() {
  vi.resetModules()
  return await import("@/stores/auth")
}

async function importFreshCart() {
  vi.resetModules()
  return await import("@/stores/cart")
}

async function importFreshRouter() {
  vi.resetModules()
  return (await import("@/router")).default
}

async function importFreshApp() {
  vi.resetModules()
  return (await import("@/App.vue")).default
}

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  vi.useFakeTimers()

  ;(globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn() as unknown as typeof fetch
})

afterEach(() => {
  vi.useRealTimers()
})

describe("Frontend smoke tests (8 total)", () => {
  it("auth: login() setzt token/email/loggedIn und isLoggedIn wird true", async () => {
    const auth = await importFreshAuth()

    expect(auth.isLoggedIn.value).toBe(false)

    auth.login("t-123", "test@example.com")

    expect(auth.isLoggedIn.value).toBe(true)
    expect(localStorage.getItem("token")).toBe("t-123")
    expect(localStorage.getItem("email")).toBe("test@example.com")
    expect(localStorage.getItem("loggedIn")).toBe("true")
    expect(auth.getAuthToken()).toBe("t-123")
    expect(auth.getUserEmail()).toBe("test@example.com")
  })

  it("auth: logout() räumt localStorage auf und isLoggedIn wird false", async () => {
    const auth = await importFreshAuth()

    auth.login("t-123", "test@example.com")
    expect(auth.isLoggedIn.value).toBe(true)

    auth.logout()
    expect(auth.isLoggedIn.value).toBe(false)

    expect(localStorage.getItem("token")).toBeNull()
    expect(localStorage.getItem("email")).toBeNull()
    expect(localStorage.getItem("loggedIn")).toBeNull()
  })

  it("cart: addToCart verhindert Duplikate und cartCount stimmt", async () => {
    const cart = await importFreshCart()

    expect(cart.cartCount.value).toBe(0)

    cart.addToCart({
      id: 1,
      brand: "Nike",
      size: "42",
      price: "99.99",
      ownerEmail: "seller@example.com",
      imagePath: null,
    })

    expect(cart.cartCount.value).toBe(1)

    cart.addToCart({
      id: 1,
      brand: "Nike",
      size: "42",
      price: "99.99",
      ownerEmail: "seller@example.com",
      imagePath: null,
    })

    expect(cart.cartCount.value).toBe(1)

    await flushPromises()

    const stored = JSON.parse(localStorage.getItem("cart") || "[]") as Array<{ id: number }>
    expect(stored).toHaveLength(1)
    expect(stored[0]).toBeDefined()
    expect(stored[0]!.id).toBe(1)
  })

  it("router guard: nicht eingeloggt -> /home wird auf / (login) umgeleitet", async () => {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("token")

    const router = await importFreshRouter()

    await router.push("/home")
    await router.isReady()

    expect(router.currentRoute.value.name).toBe("login")
    expect(router.currentRoute.value.path).toBe("/")
  })

  it("router guard: eingeloggt -> / (login) wird auf /home umgeleitet", async () => {
    localStorage.setItem("loggedIn", "true")
    localStorage.setItem("token", "t-xyz")
    localStorage.setItem("email", "me@example.com")

    const router = await importFreshRouter()

    await router.push("/home")
    await router.isReady()

    await router.push("/")
    await router.isReady()

    expect(router.currentRoute.value.name).toBe("home")
    expect(router.currentRoute.value.path).toBe("/home")
  })

  it("App: Topbar ist ausgeblendet, wenn nicht eingeloggt (token fehlt)", async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedIn")

    const router = await importFreshRouter()
    const App = await importFreshApp()

    await router.push("/")
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.find("header.topbar").exists()).toBe(false)
  })

  it("App: Topbar sichtbar + Cart-Badge zeigt Count > 0", async () => {
    localStorage.setItem("token", "t-xyz")
    localStorage.setItem("email", "me@example.com")
    localStorage.setItem("loggedIn", "true")

    localStorage.setItem(
      "cart",
      JSON.stringify([
        { id: 7, brand: "Adidas", size: "43", price: "120", ownerEmail: "seller@x.de", imagePath: null },
        { id: 8, brand: "Puma", size: "42.5", price: "89.5", ownerEmail: "seller@y.de", imagePath: null },
      ])
    )

    const router = await importFreshRouter()
    const App = await importFreshApp()

    await router.push("/home")
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.find("header.topbar").exists()).toBe(true)

    const cartLink = wrapper.find('[aria-label="Warenkorb"]')
    expect(cartLink.exists()).toBe(true)

    const badge = cartLink.find(".badge")
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe("2")
  })

  it("App: Notifications werden geladen und Popup öffnet", async () => {
    localStorage.setItem("token", "t-xyz")
    localStorage.setItem("email", "me@example.com")
    localStorage.setItem("loggedIn", "true")

    type FetchCall = [RequestInfo | URL, RequestInit?]

    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const u = String(input)

        if (u.includes("/api/notifications") && (!init || init.method !== "POST")) {
          return new Response(JSON.stringify([{ id: 1, message: "A" }, { id: 2, message: "B" }]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        }

        if (u.includes("/api/notifications/") && init?.method === "POST") {
          return new Response(null, { status: 200 })
        }

        return new Response(null, { status: 404 })
      })

    ;(globalThis as unknown as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch

    const router = await importFreshRouter()
    const App = await importFreshApp()

    await router.push("/home")
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()

    const notifButton = wrapper.find('[aria-label="Benachrichtigungen"]')
    expect(notifButton.exists()).toBe(true)

    await notifButton.trigger("click")
    expect(wrapper.find(".popup").exists()).toBe(true)

    vi.advanceTimersByTime(8000)
    await flushPromises()

    const calls = fetchMock.mock.calls as unknown as FetchCall[]
    expect(calls.some((c) => String(c[0]).includes("/api/notifications"))).toBe(true)
  })
})
