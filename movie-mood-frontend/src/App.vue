<script setup lang="ts">
import CitySearch from './components/CitySearch.vue'
import MovieCard from './components/MovieCard.vue'

const movies = [
  {
    title: "Inception",
    overview: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction...",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 4.5
  },
  {
    title: "The Matrix",
    overview: "Programmeur anonyme, Thomas Anderson est aussi l'un des pirates les plus recherchés...",
    posterUrl: "https://image.tmdb.org/t/p/w500/hEpWvX6Bp79eLxY1K2FxRcj0xKC.jpg",
    rating: 4.8
  },
  {
    title: "Interstellar",
    overview: "Dans un futur proche, la Terre est devenue hostile pour l'homme...",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 4.7
  }
]

const handleSearch = (city: string) => {
  console.log('Recherche pour la ville:', city)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">
        Movie Mood Finder
      </h1>
      
      <CitySearch @search="handleSearch" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <MovieCard
          v-for="movie in movies"
          :key="movie.title"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>
