<template>
  <div>
    <nav v-if="token">
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/chargers">Chargers</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const token = ref(localStorage.getItem('token'))

onMounted(() => {
  window.addEventListener('storage', () => {
    token.value = localStorage.getItem('token')
  })
})
</script>

<style>
nav {
  padding: 1rem;
  background: #333;
}

nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-active {
  color: #42b983;
}
</style>