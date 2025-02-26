<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import { ref } from 'vue'

interface MovieProps {
  movie: {
    title: string
    posterUrl: string
    rating: number
    overview: string
  }
}

const props = defineProps<MovieProps>()

const userRating = ref(0)
</script>

<template>
  <Card class="movie-card">
    <template #header>
      <img :src="movie.posterUrl" :alt="movie.title" class="w-full h-48 object-cover" />
    </template>
    
    <template #title>
      {{ movie.title }}
    </template>
    
    <template #content>
      <p class="line-clamp-3 text-sm text-gray-600 mb-4">{{ movie.overview }}</p>
      <div class="flex items-center gap-2">
        <i class="pi pi-star-fill text-yellow-400"></i>
        <span>{{ movie.rating }}/5</span>
      </div>
    </template>
    
    <template #footer>
      <Button icon="pi pi-heart" label="Favoris" />
      <Button icon="pi pi-info-circle" label="Détails" severity="secondary" />
    </template>
  </Card>
</template>

<style scoped>
.movie-card {
  width: 300px;
  height: 100%;
}

:deep(.p-card-header) {
  padding: 0;
  overflow: hidden;
}

:deep(.p-card-title) {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style> 