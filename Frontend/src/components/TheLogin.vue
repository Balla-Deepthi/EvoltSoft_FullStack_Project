<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <input 
        type="email" 
        v-model="form.email" 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        v-model="form.password" 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p>
      Don't have an account? 
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const error = ref('')
const form = ref({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    error.value = ''
    const response = await axios.post('http://localhost:3000/login', form.value)
    localStorage.setItem('token', response.data.token)
    router.push('/profile')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>