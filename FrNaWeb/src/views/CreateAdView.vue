<template>
  <div class="create-container">

    <!-- Logo oben links -->
    <img src="@/assets/logo.png" alt="Logo" class="small-logo" />

    <!-- Eingabefelder -->
    <div class="form-wrapper">
      <input type="text" v-model="brand" placeholder="Schuhmarke" />
      <input type="text" v-model="size" placeholder="Größe" />
      <input type="text" v-model="price" placeholder="Preis" />

      <!-- Plus Button -->
      <div class="add-button">
        <button @click="addItem">+</button>
        <span>hinzufügen</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const brand = ref('')
const size = ref('')
const price = ref('')

function addItem() {
  console.log("Gespeichert:", {
    brand: brand.value,
    size: size.value,
    price: price.value
  })
}
</script>

<style scoped>
.create-container {
  height: 100vh;               /* voller Bildschirm */
  display: flex;               /* Flexbox aktivieren */
  flex-direction: column;      /* alles untereinander */
  justify-content: center;     /* VERTIKAL zentrieren */
  align-items: center;         /* HORIZONTAL zentrieren */
}


.small-logo {
  width: 150px;
  margin-bottom: 2rem;
}

/* Eingabefelder */
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 250px;
}

input {
  padding: 0.7rem;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 30px;
}

/* Add Button */
.add-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.add-button button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid black;
  font-size: 1.5rem;
  background: white;
  cursor: pointer;
}

.add-button span {
  margin-top: 0.3rem;
  font-size: 0.9rem;
}
</style>
