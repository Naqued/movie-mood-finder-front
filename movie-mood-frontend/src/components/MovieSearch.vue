<script setup lang="ts">
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'
import ProgressSpinner from 'primevue/progressspinner'
import { ref } from 'vue'

const searchQuery = ref('')
const loading = ref(false)
const cities = ref([])

const searchCity = async (event: { query: string }) => {
  loading.value = true
  // Simulation d'une recherche
  await new Promise(resolve => setTimeout(resolve, 1000))
  cities.value = ['Paris', 'Lyon', 'Marseille'].filter(city => 
    city.toLowerCase().includes(event.query.toLowerCase())
  )
  loading.value = false
}
</script>

<template>
  <div class="search-container">
    <AutoComplete
      v-model="searchQuery"
      :suggestions="cities"
      @complete="searchCity"
      placeholder="Entrez une ville..."
      class="w-full"
    >
      <template #loader>
        <ProgressSpinner style="width: 1.5rem; height: 1.5rem" />
      </template>
    </AutoComplete>
  </div>
</template>

<style scoped>
.search-container {
  max-width: 500px;
  margin: 2rem auto;
}
</style>
