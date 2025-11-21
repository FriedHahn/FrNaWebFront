<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { watch } from 'vue'
import { isLoggedIn, logout } from "@/stores/auth"

const router = useRouter()

function onLogout() {
  logout()
  router.replace({ name: 'login'})
}

watch(isLoggedIn, (v) => {
  if (!v) router.replace({ name: 'login' })
})
</script>

<template>
  <header v-if="isLoggedIn">
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button @click="logout">Logout</button>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
button {
  margin-left: 1rem;
  cursor: pointer;
}
nav a {
  color: black !important;
}

nav a.router-link-active {
  font-weight: bold;
}


</style>
