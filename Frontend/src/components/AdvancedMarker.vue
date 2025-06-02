<template>
    <!-- No template needed as this is a utility component -->
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  
  const props = defineProps({
    position: Object,
    map: Object,
    title: String
  })
  
  const markerRef = ref(null)
  
  watch([() => props.map, () => props.position, () => props.title], () => {
    if (!props.map) return
  
    markerRef.value = new window.google.maps.marker.AdvancedMarkerElement({
      position: props.position,
      map: props.map,
      title: props.title
    })
  }, { immediate: true })
  
  onUnmounted(() => {
    if (markerRef.value) {
      markerRef.value.setMap(null)
    }
  })
  </script>