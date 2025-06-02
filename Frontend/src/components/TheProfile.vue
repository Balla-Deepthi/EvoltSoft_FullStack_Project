<template>
  <div class="profile-container" v-if="user">
    <h2>Profile Details</h2>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>

    <button @click="handleLogout" class="logout-btn">Logout</button>

    <hr />

    <h3>{{ editId ? 'Edit Charger' : 'Add New Charger' }}</h3>
    <form @submit.prevent="handleSubmit" class="charger-form">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.location" placeholder="Location (latitude, longitude)" required />
      <select v-model="form.status" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input v-model="form.powerOutput" type="number" placeholder="Power Output (kW)" required />
      <button type="submit">{{ editId ? 'Update' : 'Add' }}</button>
      <button v-if="editId" type="button" @click="cancelEdit" class="cancel-btn">Cancel</button>
    </form>

    <h3>Charging Stations</h3>
    <div v-if="loadingChargers">Loading chargers...</div>
    <div v-else-if="!chargers.length">No chargers found.</div>
    <template v-else>
      <table class="charger-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Power Output</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charger in chargers" :key="charger._id">
            <td>{{ charger.name }}</td>
            <td>{{ formatLocation(charger.location) }}</td>
            <td>{{ charger.status }}</td>
            <td>{{ charger.powerOutput }}</td>
            <td>
              <button @click="handleEdit(charger)" class="action-btn">Edit</button>
              <button @click="handleDelete(charger._id)" class="action-btn delete-btn">
                Delete
              </button>
              <button @click="handleViewMap(charger)" class="action-btn">View Map</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="showMap && selectedCharger" class="map-container">
        <MapView :charger="selectedCharger" @close="closeMap" />
      </div>
    </template>
  </div>
  <div v-else class="loading">Loading profile...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import MapView from './MapView.vue'

const API_BASE_URL = 'http://localhost:3000'

const router = useRouter()
const user = ref(null)
const chargers = ref([])
const loadingChargers = ref(false)
const editId = ref(null)
const showMap = ref(false)
const selectedCharger = ref(null)
// const error = ref(null)

const form = ref({
  name: '',
  location: '',
  status: 'Active',
  powerOutput: '',
})

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    const res = await axios.get(`${API_BASE_URL}/profile`)
    user.value = res.data
    await fetchChargers()
  } catch (error) {
    console.error('Profile fetch error:', error)
    localStorage.removeItem('token')
    router.push('/login')
  }
}

const fetchChargers = async () => {
  try {
    loadingChargers.value = true
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/chargers', {
      headers: { Authorization: `Bearer ${token}` },
    })
    chargers.value = res.data
  } catch (error) {
    console.error('Failed to load chargers:', error)
  } finally {
    loadingChargers.value = false
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token')
    const [latitude, longitude] = form.value.location.split(',').map((c) => parseFloat(c.trim()))

    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Invalid location format. Use "latitude, longitude"')
      return
    }

    const payload = {
      name: form.value.name,
      location: { latitude, longitude },
      status: form.value.status,
      powerOutput: Number(form.value.powerOutput),
    }

    if (editId.value) {
      await axios.put(`http://localhost:3000/api/chargers/${editId.value}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } else {
      await axios.post('http://localhost:3000/api/chargers', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }

    resetForm()
    fetchChargers()
  } catch (error) {
    alert(error.response?.data?.message || 'Error saving charger')
  }
}

const handleEdit = (charger) => {
  const { latitude, longitude } = charger.location || {}
  form.value = {
    name: charger.name,
    location: `${latitude}, ${longitude}`,
    status: charger.status,
    powerOutput: charger.powerOutput?.toString() || '',
  }
  editId.value = charger._id
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this charger?')) return
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3000/api/chargers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchChargers()
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete charger')
  }
}

const handleViewMap = (charger) => {
  if (charger.location) {
    selectedCharger.value = charger
    showMap.value = true
  }
}

const closeMap = () => {
  showMap.value = false
  selectedCharger.value = null
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    location: '',
    status: 'Active',
    powerOutput: '',
  }
  editId.value = null
}

const formatLocation = (location) => {
  return location ? `${location.latitude}, ${location.longitude}` : 'N/A'
}

onMounted(fetchProfile)
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.logout-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.cancel-btn {
  background-color: #666;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.profile-container {
  padding: 20px;
}

.charger-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 20px 0;
}

.charger-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.charger-table th,
.charger-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.action-btn {
  margin-right: 5px;
}

.delete-btn {
  background-color: #ff4444;
}

.map-container {
  margin-top: 20px;
}
</style>
