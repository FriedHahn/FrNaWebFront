<script setup lang="ts">
import { ref, onMounted } from "vue"

type Ad = {
  id: number
  brand: string
  size: string
  price: string
}

const ads = ref<Ad[]>([])
const errorMessage = ref("")

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function loadAds() {
  errorMessage.value = ""
  try {
    const res = await fetch(`${backendBaseUrl}/api/ads`)
    console.log("Antwort /api/ads:", res)

    if (!res.ok) {
      errorMessage.value = `Anzeigen konnten nicht geladen werden (Status ${res.status}).`
      return
    }
    ads.value = await res.json()
  } catch (e) {
    console.error("Fehler beim Laden der Anzeigen:", e)
    errorMessage.value = "Server nicht erreichbar."
  }
}

onMounted(loadAds)
</script>

<template>
  <div class="ads-page">
    <div class="ads-inner">
      <header class="ads-header">
        <h1>Alle Anzeigen</h1>
        <p>Hier siehst du alle gespeicherten Schuhanzeigen.</p>
      </header>

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>

      <p v-else-if="ads.length === 0" class="empty-text">
        Es wurden noch keine Anzeigen erstellt.
      </p>

      <div v-else class="ads-grid">
        <article v-for="ad in ads" :key="ad.id" class="ad-card">
          <h3>{{ ad.brand }}</h3>
          <p class="line"><span>Größe:</span> {{ ad.size }}</p>
          <p class="line"><span>Preis:</span> {{ ad.price }} €</p>
        </article>
      </div>
    </div>
  </div>
</template>


<style>
.ads-page {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.ads-inner {
  width: 100%;
  max-width: 1100px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: 0 24px 60px rgb(0, 0, 0, 0.25);
}

.ads-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.ads-header p {
  margin: 4px 0 20px;
  color: #6b7280;
}

.error-text {
  color: #dc2626;
}

.empty-text {
  color: #6b7280;
}

.ads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.ad-card {
  background: white;
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.ad-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
}

.line {
  margin: 2px 0;
  font-size: 14px;
}

.line span {
  font-weight: 600;
}
</style>
