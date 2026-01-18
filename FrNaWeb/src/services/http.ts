import router from "@/router"
import { logout } from "@/stores/auth"

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init)

  if (res.status === 401) {
    logout()

    if (router.currentRoute.value.name !== "login") {
      await router.push({ name: "login" })
    }
  }

  return res
}
