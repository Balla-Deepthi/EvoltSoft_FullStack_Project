<template>
    <div class="auth-form">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <input 
          v-model="form.name" 
          placeholder="Name" 
          required 
        />
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
        <button type="submit">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const error = ref('')
  const form = ref({
    name: '',
    email: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      error.value = ''
      const response = await axios.post('http://localhost:3000/register', form.value)
      if (response.data) {
        form.value = { name: '', email: '', password: '' }
        alert('Registration successful! Please login.')
        router.push('/login')
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
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
    background: white;
  }
  
  .auth-form h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .auth-form input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .auth-form button {
    width: 100%;
    padding: 0.8rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .auth-form button:hover {
    background-color: #3aa876;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
  </style>