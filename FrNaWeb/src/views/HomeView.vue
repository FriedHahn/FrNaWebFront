<template>
  <div class="landing-container">

    <!-- Logo -->
    <img src="@/assets/logo.png" alt="Logo" class="logo" />

    <!-- Buttons -->
    <div class="button-group">
      <button class="primary-btn" @click="$router.push('/create')">
        Anzeige erstellen
      </button>

      <button class="secondary-btn" @click="$router.push('/ads')">
        alle Anzeigen
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
// aktuell brauchst du hier nichts
</script>

<style scoped>
.landing-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff; /* reines Weiß */

}

/* Logo */
.logo {
  width: 250px;
  margin-bottom: 2rem;
}

/* Container für Buttons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 240px;
}

/* Button Basis-Styling */
button {
  padding: 0.8rem 1rem;
  border-radius: 30px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid black;
  background: white;
  transition: 0.25s;
}

/* Hover Effekte */
button:hover {
  background: #f2f2f2;
}
</style>

