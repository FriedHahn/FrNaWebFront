<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <div class="home-page">
    <div class="home-card">
      <h1 class="home-title">ShoeLive</h1>
      <p class="home-subtitle">Wähle, was du machen möchtest.</p>

      <div class="home-actions">
        <RouterLink :to="{ name: 'create-ad' }" class="home-box">
          <h2>Anzeige erstellen</h2>
          <p>Neue Schuhanzeige anlegen.</p>
        </RouterLink>

        <RouterLink :to="{ name: 'ads' }" class="home-box">
          <h2>Alle Anzeigen</h2>
          <p>Alle gespeicherten Anzeigen ansehen.</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
.home-page {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-card {
  max-width: 1100px;
  width: 100%;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
}

.home-title {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  color: #111827;
}

.home-subtitle {
  margin: 6px 0 24px;
  color: #6b7280;
}

.home-actions {
  display: flex;
  gap: 24px;
}

.home-box {
  flex: 1;
  background: #f9fafb;
  border-radius: 18px;
  padding: 20px 24px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.home-box h2 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.home-box p {
  margin: 0;
  color: #6b7280;
}

.home-box:hover {
  transform: translateY(-2px);
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
}
</style>
