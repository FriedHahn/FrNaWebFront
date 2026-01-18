import { getBackendBaseUrl, authHeaders } from "@/services/apiClient"
import { apiFetch } from "@/services/http"

export async function fetchProfile() {
  const res = await apiFetch(`${getBackendBaseUrl()}/api/profile`, {
    method: "GET",
    headers: authHeaders()
  })

  if (!res.ok) {
    throw new Error("Profil konnte nicht geladen werden")
  }

  return await res.json()
}
