<script setup lang="ts">
import { ref, reactive } from 'vue'
import CitySearch from './components/CitySearch.vue'
import MovieCard from './components/MovieCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { getRecommendations } from './services/api'

const state = reactive({
  loading: false,
  error: null as string | null,
  weather: null as string | null,
  mood: null as string | null,
  movies: [] as any[]
})

const handleSearch = async (city: string) => {
  state.loading = true
  state.error = null
  
  console.log('Tentative d\'appel API pour la ville:', city)
  try {
    const data = await getRecommendations(city)
    console.log('Réponse API:', data)
    state.weather = data.weather
    state.mood = data.mood
    state.movies = data.movies.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average / 2 // Convert to 5-star rating
    }))
  } catch (error) {
    console.error('Erreur détaillée:', error)
    state.error = "Impossible de charger les recommandations"
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
        Movie Mood Finder
      </h1>
      
      <CitySearch @search="handleSearch" />
      
      <div v-if="state.loading" class="flex justify-center my-8">
        <ProgressSpinner />
      </div>
      
      <Message v-if="state.error" severity="error" :closable="false" class="mb-4">
        {{ state.error }}
      </Message>
      
      <div v-if="state.weather && state.mood" class="text-center mb-8">
        <h2 class="text-2xl mb-2">{{ state.weather }}</h2>
        <p class="text-gray-600">Ambiance : {{ state.mood }}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <MovieCard
          v-for="movie in state.movies"
          :key="movie.title"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>
