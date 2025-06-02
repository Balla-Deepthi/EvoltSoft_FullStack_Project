
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import axios from 'axios'

const app = createApp(App)
axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      }
      return Promise.reject(error)
    }
  )
app.use(router)
app.mount('#app')
