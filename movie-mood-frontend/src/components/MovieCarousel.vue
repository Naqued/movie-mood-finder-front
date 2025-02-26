<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MovieCard from './MovieCard.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import required Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps<{
  movies: Array<{
    title: string
    posterUrl: string
    rating: number
    overview: string
  }>
}>()

onMounted(() => {
  console.log('MovieCarousel mounted with movies:', props.movies.length)
})

const hoveredIndex = ref<number | null>(null)

const handleSlideClick = (movie: any) => {
  console.log('Slide clicked for movie:', movie.title)
}

// Group movies into rows
const movieRows = computed(() => {
  const rows = []
  const itemsPerRow = 10 // We show more items per row for smooth infinite scroll effect
  
  for (let i = 0; i < props.movies.length; i += itemsPerRow) {
    rows.push(props.movies.slice(i, Math.min(i + itemsPerRow, props.movies.length)))
  }
  return rows
})

// Swiper configuration
const swiperOptions = {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  spaceBetween: 30,
  loop: false,
  speed: 600,
  grabCursor: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  allowTouchMove: false,
  preventClicks: false,
  preventClicksPropagation: false,
  effect: 'slide',
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
}
</script>

<template>
  <div class="netflix-carousel">
    <div v-for="(row, rowIndex) in movieRows" 
         :key="rowIndex" 
         class="carousel-row mb-16">
      <!-- Row title -->
      <h3 class="text-2xl font-semibold text-white mb-6 px-4">
        {{ rowIndex === 0 ? 'Films recommandés' : 'Vous aimerez aussi' }}
      </h3>
      
      <!-- Swiper carousel -->
      <Swiper v-bind="swiperOptions" class="movie-swiper">
        <SwiperSlide v-for="(movie, index) in row" 
                     :key="movie.title"
                     class="movie-slide"
                     v-slot="{ isActive }">
          <div class="slide-content"
               @mouseenter="hoveredIndex = index"
               @mouseleave="hoveredIndex = null">
            <MovieCard 
              :movie="movie"
              :is-active="isActive || hoveredIndex === index"
            />
          </div>
        </SwiperSlide>

        <!-- Custom navigation buttons -->
        <div class="swiper-button-prev !opacity-100 !z-30"></div>
        <div class="swiper-button-next !opacity-100 !z-30"></div>
      </Swiper>
      
      <!-- Gradient overlays -->
      <div class="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#141414] to-transparent z-[2] pointer-events-none"></div>
      <div class="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#141414] to-transparent z-[2] pointer-events-none"></div>
    </div>
  </div>
</template>

<style scoped>
.netflix-carousel {
  @apply -mx-6 px-6;
}

.carousel-row {
  @apply relative;
}

:deep(.movie-swiper) {
  @apply overflow-visible py-12;
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 0 24px;
}

:deep(.swiper-slide) {
  @apply transition-all duration-500 ease-out opacity-50;
  width: 280px;
  transform-origin: center center;
  pointer-events: auto !important;
  position: relative;
  z-index: 1;
  transform: scale(0.85);
}

:deep(.swiper-slide-active) {
  @apply opacity-100;
  transform: scale(1);
  z-index: 3;
}

:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  @apply opacity-70;
  z-index: 2;
  transform: scale(0.9);
}

.slide-content {
  @apply transition-transform duration-300 ease-out;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  pointer-events: auto !important;
}

/* Navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  @apply w-12 h-12 bg-black/50 rounded-full transition-all duration-300
         flex items-center justify-center backdrop-blur-sm border border-white/10;
  top: 45%;
  opacity: 1 !important;
  z-index: 20;
}

:deep(.swiper-button-next) {
  right: 2%;
}

:deep(.swiper-button-prev) {
  left: 2%;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  @apply bg-white/20 scale-110;
}

.carousel-row:hover :deep(.swiper-button-next),
.carousel-row:hover :deep(.swiper-button-prev) {
  @apply opacity-100;
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  @apply text-2xl text-white;
  font-size: 1.5rem !important;
}

:deep(.swiper-button-disabled) {
  @apply opacity-0 pointer-events-none;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    @apply w-10 h-10;
  }
  
  :deep(.swiper-slide) {
    width: 240px;
  }
}

@media (max-width: 640px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    @apply w-8 h-8;
  }
  
  :deep(.swiper-button-next::after),
  :deep(.swiper-button-prev::after) {
    font-size: 1.2rem !important;
  }
  
  :deep(.swiper-slide) {
    width: 200px;
  }
}
</style> 