<script setup lang="ts">
import { ref } from "vue"
import { useRouter} from "vue-router"
import { login as setLoginState } from "@/stores/auth"

const router = useRouter()
const email = ref("test@mail.de")
const password = ref("1234")
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function login() {
  const res = await fetch(`${backendBaseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  })

  const data = await res.json()

  if (res.ok && data.success) {
    setLoginState(data.token)
    router.push({ name: "home"})
  }
}

</script>

<template>
  <div style="max-width:420px;margin:48px auto; text-align: center;">
    <h2> Willkommen auf FrNa</h2>
    <p>Bitte melden Sie sich an</p>

  <input v-model="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Passwort" />
  <button @click="login" style="padding:8px 12px;">Einloggen</button>
  </div>

</template>

<style scoped>

</style>
