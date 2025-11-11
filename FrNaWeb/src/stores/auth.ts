import { ref } from "vue"

export const isLoggedIn = ref(!!localStorage.getItem("loggedIn"))

export function login(token: string) {
  localStorage.setItem("loggedIn", "true")
  localStorage.setItem("token", token)
  isLoggedIn.value = true
}

export function logout() {
  localStorage.removeItem("loggedIn")
  localStorage.removeItem("token")
  isLoggedIn.value = false
}
