<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Rating from 'primevue/rating'
import { computed } from 'vue'

const props = defineProps<{
  movie: {
    title: string
    overview: string
    posterUrl: string
    rating: number
  }
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const onHide = () => {
  emit('update:visible', false)
}
</script>

<template>
  <Dialog 
    v-model:visible="isVisible"
    modal
    :header="movie.title"
    :closable="true"
    :dismissableMask="true"
    position="center"
    :maximizable="true"
    @hide="onHide"
    class="movie-details-dialog"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ zIndex: 9999 }"
    appendTo="body"
  >
    <div class="flex gap-6">
      <!-- Movie Poster -->
      <div class="flex-shrink-0 w-[300px] h-[450px] rounded-xl overflow-hidden shadow-2xl">
        <img 
          :src="movie.posterUrl" 
          :alt="movie.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Movie Details -->
      <div class="flex-grow">
        <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {{ movie.title }}
        </h2>
        
        <!-- Rating -->
        <div class="mb-6 flex items-center">
          <Rating 
            :modelValue="movie.rating"
            :readonly="true" 
            :cancel="false"
            class="text-yellow-400"
          />
          <span class="ml-2 text-gray-400">
            {{ movie.rating.toFixed(1) }}/5
          </span>
        </div>

        <!-- Overview -->
        <div class="text-gray-300 leading-relaxed">
          <h3 class="text-xl font-semibold mb-2 text-white">Synopsis</h3>
          <p class="text-lg">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.movie-details-dialog {
  @apply max-w-4xl;
}

:deep(.p-dialog) {
  @apply bg-[#1a1a1a] text-white rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

:deep(.p-dialog-header) {
  @apply bg-transparent border-b border-white/10 pb-4;
}

:deep(.p-dialog-title) {
  @apply text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent;
}

:deep(.p-dialog-content) {
  @apply bg-transparent p-6;
}

:deep(.p-dialog-header-close),
:deep(.p-dialog-header-maximize) {
  @apply text-white/50 hover:text-white transition-colors;
}

:deep(.p-rating-icon) {
  @apply text-2xl;
}

:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  @apply text-yellow-400;
}

:deep(.p-dialog-mask) {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
}

/* Add transition for dialog */
:deep(.p-dialog-enter-active) {
  transition: all 0.3s ease-out;
}

:deep(.p-dialog-leave-active) {
  transition: all 0.2s ease-in;
}

:deep(.p-dialog-enter-from),
:deep(.p-dialog-leave-to) {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive styles */
@media (max-width: 768px) {
  .flex {
    @apply flex-col;
  }
  
  .flex-shrink-0 {
    @apply w-full h-[300px] mb-4;
  }
}
</style> 