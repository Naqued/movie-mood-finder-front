<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { computed, ref, onMounted, watch } from 'vue'
import Rating from 'primevue/rating'
import MovieDetailsDialog from './MovieDetailsDialog.vue'

const props = defineProps<{
  movie: {
    title: string
    posterUrl: string
    rating: number
    overview: string
  }
  isActive?: boolean
}>()

const dialogVisible = ref(false)

onMounted(() => {
  console.log('MovieCard mounted for:', props.movie.title)
})

const handleClick = (event: MouseEvent) => {
  console.log('MovieCard clicked:', props.movie.title)
  event.preventDefault()
  event.stopPropagation()
  dialogVisible.value = true
  console.log('Dialog visibility set to:', dialogVisible.value)
}

// Watch dialogVisible changes
watch(dialogVisible, (newValue) => {
  console.log('Dialog visibility changed to:', newValue)
})

const emit = defineEmits(['click'])

const ratingColor = computed(() => {
  if (props.movie.rating >= 4) return 'text-green-500'
  if (props.movie.rating >= 3) return 'text-yellow-500'
  return 'text-red-500'
})
</script>

<template>
  <div class="movie-card-wrapper" @click.stop="handleClick">
    <div 
      class="movie-card group"
      :class="{ 'is-active': isActive }"
    >
      <div class="relative rounded-lg overflow-hidden shadow-xl h-full">
        <img 
          :src="movie.posterUrl" 
          :alt="movie.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          draggable="false"
        />
        
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
          <h3 class="text-white font-bold text-lg mb-2">{{ movie.title }}</h3>
          <Rating 
            :modelValue="movie.rating"
            :readonly="true" 
            :cancel="false"
            class="text-yellow-400"
          />
        </div>
      </div>
    </div>

    <MovieDetailsDialog
      :movie="movie"
      v-model:visible="dialogVisible"
    />
  </div>
</template>

<style scoped>
.movie-card-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: inherit;
  cursor: pointer !important;
}

.movie-card {
  @apply relative transition-all duration-300 w-full h-full;
  aspect-ratio: 2/3;
  background: none;
  outline: none;
}

.movie-card.is-active {
  @apply z-10;
}

.movie-card:hover {
  @apply scale-105;
}

.movie-card:focus {
  outline: 2px solid theme('colors.emerald.500');
  outline-offset: 2px;
}

:deep(.p-rating-icon) {
  @apply text-lg pointer-events-none;
}

:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  @apply text-yellow-400;
}

:deep(.p-dialog) {
  z-index: 9999 !important;
}

:deep(.p-dialog-mask) {
  z-index: 9998 !important;
}
</style> 