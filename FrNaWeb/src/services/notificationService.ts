import { getBackendBaseUrl, authHeaders } from "@/services/apiClient"
import { apiFetch } from "@/services/http"

export type NotificationItem = {
  id: number
  message: string
}

export async function fetchUnreadNotifications(): Promise<NotificationItem[]> {
  const res = await apiFetch(`${getBackendBaseUrl()}/api/notifications`, {
    headers: authHeaders()
  })

  if (!res.ok) return []

  const data = await res.json()
  return Array.isArray(data) ? data : []
}

export async function markNotificationRead(id: number): Promise<void> {
  await apiFetch(`${getBackendBaseUrl()}/api/notifications/${id}/read`, {
    method: "POST",
    headers: authHeaders()
  })
}
