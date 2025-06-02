<template>
  <div class="map-view-container">
    <button @click="$emit('close')" class="close-map-btn">Close Map</button>
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  charger: Object
})

defineEmits(['close'])

const mapRef = ref(null)
const markerRef = ref(null)
const apiKey = 'AIzaSyCdUKj-j6A5yysU6wwkSfZF-2y-77qXofk'

const initMap = () => {
  if (!props.charger?.location) return

  const { latitude, longitude } = props.charger.location
  
  if (!mapRef.value) {
    mapRef.value = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: latitude, lng: longitude }
    })

    markerRef.value = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: mapRef.value
    })
  } else {
    const newPos = { lat: latitude, lng: longitude }
    mapRef.value.setCenter(newPos)
    markerRef.value.setPosition(newPos)
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  script.async = true
  script.onload = initMap
  document.head.appendChild(script)

  return () => {
    document.head.removeChild(script)
  }
})

watch(() => props.charger, initMap)
</script>

<style scoped>
.map-view-container {
  position: relative;
}

.close-map-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>