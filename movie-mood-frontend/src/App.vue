<script setup lang="ts">
import { reactive } from 'vue'
import CitySearch from './components/CitySearch.vue'
import MovieCarousel from './components/MovieCarousel.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { getRecommendations } from './services/api'
import backgroundImage from './assets/background.png'

const state = reactive({
  loading: false,
  error: null as string | null,
  weather: null as string | null,
  mood: null as string | null,
  description: null as string | null,
  movies: [] as any[],
  hasSearched: false
})

const handleSearch = async (city: string) => {
  state.loading = true
  state.error = null
  state.hasSearched = true
  
  try {
    const data = await getRecommendations(city)
    state.weather = data.weather
    state.mood = data.mood
    state.description = data.description
    state.movies = data.movies.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average / 2
    }))
  } catch (error) {
    state.error = "Impossible de charger les recommandations"
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <div class="min-h-screen overflow-hidden relative bg-[#141414]">
    <!-- Background banner -->
    <div class="absolute inset-0 overflow-hidden">
      <img :src="backgroundImage" 
           alt="Background" 
           class="w-full h-full object-cover fixed inset-0 transition-opacity duration-1000"
           style="filter: brightness(0.7);" />
      
      <!-- Gradient overlays for better readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent opacity-95"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-[#141414]/50 via-transparent to-[#141414]"></div>
    </div>

    <!-- Main content -->
    <div class="container mx-auto px-6 relative z-10">
      <TransitionGroup 
        class="transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
        enter-from-class="opacity-0 translate-y-8"
        leave-to-class="opacity-0 -translate-y-8"
        mode="out-in"
      >
        <!-- Initial state -->
        <div v-if="!state.hasSearched" key="initial" 
             class="min-h-screen flex flex-col items-center justify-center -mt-24 h-full">
          <div class="w-full max-w-3xl mx-auto px-4 text-center">
            <!-- Title Section with enhanced animation -->
            <div class="mb-8 transform transition-all duration-700">
              <h1 class="flex flex-col items-center text-center">
                <span class="text-3xl md:text-4xl font-light text-white tracking-wider font-playfair mb-1 opacity-90">
                  Movie
                </span>
                <span class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 bg-clip-text text-transparent font-playfair tracking-wide transform hover:scale-105 transition-all duration-300">
                  Mood
                </span>
                <span class="text-3xl md:text-4xl font-light text-white tracking-wider font-playfair mt-1 opacity-90">
                  Finder
                </span>
              </h1>
            </div>

            <!-- Description Section with enhanced typography -->
            <div class="space-y-8 mb-12">
              <h2 class="text-2xl md:text-3xl text-white font-playfair italic leading-relaxed tracking-wide">
                <span class="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  Vous ne savez pas quoi regarder ?
                </span>
              </h2>
              
              <!-- Process Flow -->
              <div class="relative max-w-4xl mx-auto px-12">
                <!-- Connection Lines -->
                <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 transform -translate-y-1/2 hidden md:block"></div>
                
                <!-- Steps Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                  <!-- Step 1: Weather -->
                  <div class="group relative">
                    <div class="backdrop-blur-md bg-black/20 rounded-2xl p-5 border border-white/10 
                              transform transition-all duration-500 hover:scale-102 hover:bg-black/30
                              relative z-10">
                      <div class="flex items-center gap-4">
                        <div class="text-4xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          🌤️
                        </div>
                        <div class="text-left">
                          <h3 class="text-lg font-playfair text-amber-300 font-semibold mb-1">Météo en temps réel</h3>
                          <p class="text-gray-300 text-sm font-light leading-relaxed">
                            Nous analysons la météo actuelle de votre ville
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Step 2: Mood -->
                  <div class="group relative">
                    <div class="backdrop-blur-md bg-black/20 rounded-2xl p-5 border border-white/10 
                              transform transition-all duration-500 hover:scale-102 hover:bg-black/30
                              relative z-10">
                      <div class="flex items-center gap-4">
                        <div class="text-4xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          ✨
                        </div>
                        <div class="text-left">
                          <h3 class="text-lg font-playfair text-rose-300 font-semibold mb-1">Analyse d'humeur</h3>
                          <p class="text-gray-300 text-sm font-light leading-relaxed">
                            Notre algorithme détermine l'ambiance parfaite
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Step 3: Movies -->
                  <div class="group relative">
                    <div class="backdrop-blur-md bg-black/20 rounded-2xl p-5 border border-white/10 
                              transform transition-all duration-500 hover:scale-102 hover:bg-black/30
                              relative z-10">
                      <div class="flex items-center gap-4">
                        <div class="text-4xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          🍿
                        </div>
                        <div class="text-left">
                          <h3 class="text-lg font-playfair text-orange-300 font-semibold mb-1">Passer un bon moment</h3>
                          <p class="text-gray-300 text-sm font-light leading-relaxed">
                            Passer un bon moment sans se poser de questions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>


                  
                </div>
              </div>

              <!-- Search Section -->
              <div class="relative w-full max-w-xl mx-auto mt-12 group">
                <div class="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div class="relative">
                  <CitySearch 
                    @search="handleSearch" 
                    :is-initial="true" 
                    class="rounded-2xl transform transition-all duration-300 hover:scale-102 hover:shadow-2xl" 
                  />
                  <p class="text-sm text-gray-400 font-light italic mt-4">
                    Laissez-nous vous guider vers votre film parfait
                    <span class="inline-block ml-1 animate-bounce">↑</span>
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- Search results state -->
        <div v-else key="results" class="pt-8 space-y-8">
          <!-- Header row with all elements in one line -->
          <div class="flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto px-4">
            <!-- Logo -->
            <div class="mb-8 transform transition-all duration-700">
              <h1 class="flex flex-col items-center text-center">
                <span class="text-2xl md:text-3xl font-light text-white tracking-wider font-playfair mb-1 opacity-90">
                  Movie
                </span>
                <span class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 bg-clip-text text-transparent font-playfair tracking-wide">
                  Mood
                </span>
                <span class="text-2xl md:text-3xl font-light text-white tracking-wider font-playfair mt-1 opacity-90">
                  Finder
                </span>
              </h1>
            </div>

            <!-- Search and Weather Info Row -->
            <div class="flex items-center justify-between w-full max-w-3xl">
              <!-- Search bar -->
              <div class="flex-1 max-w-xl">
                <CitySearch @search="handleSearch" :is-initial="false" />
              </div>

              <!-- Weather and mood info -->
              <div v-if="state.weather && state.mood" 
                   class="flex items-center gap-4 px-6 py-3 rounded-xl relative overflow-hidden backdrop-blur-lg
                          border border-white/10 shadow-2xl ml-8">
                <!-- Gradient background -->
                <div class="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-red-900/30"></div>
                
                <!-- Content -->
                <div class="relative z-10 flex items-center gap-4">
                  <div class="text-left">
                    <h2 class="text-xl font-bold font-playfair bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                      {{ state.mood }}
                    </h2>
                    <p class="text-gray-300 text-sm font-poppins font-light">
                      {{ state.description }}
                    </p>
                  </div>
                  <div class="text-3xl transform hover:scale-110 transition-transform">
                    {{ state.weather === 'Clear' ? '☀️' : 
                       state.weather === 'Clouds' ? '☁️' : 
                       state.weather === 'Rain' ? '🌧️' : 
                       state.weather === 'Snow' ? '❄️' : '🌤️' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="state.loading" class="flex justify-center mt-24">
            <ProgressSpinner strokeWidth="3" class="w-16 h-16" />
          </div>

          <!-- Error message -->
          <Message v-if="state.error" severity="error" :closable="false" 
                  class="mt-8 bg-red-500/20 border border-red-500/30 text-white rounded-2xl p-6">
            {{ state.error }}
          </Message>

          <!-- Movie carousel -->
          <MovieCarousel 
            v-if="state.movies.length > 0"
            :movies="state.movies"
            class="mt-12"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Custom scrollbar - keep this since Tailwind doesn't handle scrollbars */
::-webkit-scrollbar {
  @apply w-2 h-2;
}

::-webkit-scrollbar-track {
  @apply bg-white/5 rounded-sm;
}

::-webkit-scrollbar-thumb {
  @apply bg-white/20 rounded-sm transition-colors hover:bg-white/30;
}

/* PrimeVue overrides that can't be handled by Tailwind */
:deep(.p-progress-spinner-circle) {
  @apply stroke-red-600 !important;
}

/* Custom hover effect for search container */
.search-hover {
  transition: all 0.3s ease;
}

.search-hover:hover {
  transform: translateY(-2px) scale(1.01);
}

:deep(.p-inputtext) {
  @apply rounded-2xl border-0 bg-gray-900/80 text-white placeholder-gray-400 backdrop-blur-lg !important;
  transition: all 0.3s ease;
}

:deep(.p-inputtext:focus) {
  @apply bg-gray-900/95 ring-2 ring-purple-500/50 !important;
}

:deep(.p-button) {
  @apply rounded-2xl bg-gradient-to-r from-red-600 to-purple-600 border-0 !important;
  transition: all 0.3s ease;
}

:deep(.p-button:hover) {
  @apply from-red-500 to-purple-500 shadow-lg shadow-purple-500/20 !important;
  transform: translateY(-1px);
}
</style>
