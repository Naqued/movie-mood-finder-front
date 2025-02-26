<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'

const city = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  if (city.value.trim()) {
    emit('search', city.value)
  }
}
</script>

<template>
  <div class="flex justify-center gap-3 mb-8">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText 
        v-model="city"
        placeholder="Entrez votre ville"
        class="w-64"
        @keyup.enter="handleSearch"
      />
    </span>
    <Button 
      label="Rechercher" 
      icon="pi pi-search" 
      @click="handleSearch"
      :disabled="!city.trim()"
    />
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 2rem;
}
</style> 