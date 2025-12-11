<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const brand = ref("")
const size = ref("")
const price = ref("")
const errorMessage = ref("")
const isSaving = ref(false)

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL
const router = useRouter()

async function addItem() {
  errorMessage.value = ""

  if (!brand.value.trim() || !size.value.trim() || !price.value.trim()) {
    errorMessage.value = "Bitte Marke, Größe und Preis eingeben."
    return

  }

  isSaving.value = true
  try {
    const res = await fetch(`${backendBaseUrl}/api/ads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: brand.value.trim(),
        size: size.value.trim(),
        price: price.value.trim()
      })
    })

    if (!res.ok) {
      const text = await res.text()
      errorMessage.value =
        `Speichern fehlgeschlagen (Status ${res.status}).` +
        (text ? " " + text : "")
      return
    }

    router.push({ name: "home" })
  } catch (e) {
    errorMessage.value = "Server nicht erreichbar."
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="create-container">
    <img src="@/assets/logo.png" alt="Logo" class="small-logo" />

    <div class="form-wrapper">
      <h1 class="headline">Neue Anzeige erstellen</h1>
      <p class="subtext">Gib die Daten deines Schuhs ein.</p>

      <input type="text" v-model="brand" placeholder="Schuhmarke" />
      <input type="text" v-model="size" placeholder="Größe" />
      <input type="text" v-model="price" placeholder="Preis in Euro" />

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>

      <button class="save-button" @click="addItem" :disabled="isSaving">
        {{ isSaving ? "Speichern..." : "Anzeige speichern" }}
      </button>
    </div>
  </div>
</template>

<style>
.create-container {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.small-logo {
  position: absolute;
  top: 24px;
  left: 24px;
  height: 40px;
}

.form-wrapper {
  background: white;
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.headline {
  margin: 0 0 4px;
  font-size: 26px;
  font-weight: 800;
  color: #111827;
}

.subtext {
  margin: 0 0 12px;
  font-size: 14px;
  color: #6b7280;
}

.form-wrapper input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-wrapper input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.15);
}

.error-text {
  color: #dc2626;
  font-size: 14px;
}

.save-button {
  margin-top: 12px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 14px 35px rgba(79, 70, 229, 0.6);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.save-button:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(79, 70, 229, 0.7);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
