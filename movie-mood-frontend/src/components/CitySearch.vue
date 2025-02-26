<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref, computed } from 'vue'

const props = defineProps<{
  isInitial?: boolean
}>()

const city = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  if (city.value.trim()) {
    emit('search', city.value)
  }
}

const inputClasses = computed(() => `
  w-full ml-6 bg-white/5 backdrop-blur-md rounded-full border-2 border-white/10 
  text-white transition-all duration-300
  placeholder:text-white/40
  hover:bg-white/10 hover:border-white/20
  focus:bg-white/15 focus:border-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/20
  ${props.isInitial ? 'h-14 md:h-16 text-lg md:text-xl px-8 md:px-10 placeholder:text-lg md:placeholder:text-xl' : 'h-10 md:h-11 text-base md:text-lg py-2 md:py-2 px-6 md:px-8 placeholder:text-base md:placeholder:text-lg'}
`)

const buttonClasses = computed(() => `
  bg-emerald-500 hover:bg-emerald-400 border-none rounded-full transition-all duration-300
  flex items-center justify-center shadow-lg shadow-emerald-500/20
  hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 hover:scale-105
  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
  ${props.isInitial ? 'h-14 md:h-16' : ' h-10 md:h-11'}
`)

const iconClasses = computed(() => `
  pi pi-map-marker absolute top-1/2 -translate-y-1/2 text-white/40
  ${props.isInitial ? 'text-xl md:text-2xl left-4 md:left-5' : 'text-lg md:text-xl left-3 md:left-4'}
`)
</script>

<template>
  <div class="w-full relative group">
    <div class="flex items-stretch gap-2 w-full transition-transform duration-300 ease-out transform group-hover:-translate-y-1">
      <InputText 
        v-model="city"
        placeholder="Entrez votre ville..."
        :class="inputClasses"
        @keyup.enter="handleSearch"
      />
      <Button 
        @click="handleSearch"
        :disabled="!city.trim()"
        :class="buttonClasses"
        aria-label="Rechercher"
      >
        <i :class="['pi pi-search', props.isInitial ? 'text-xl' : 'text-lg']" />
      </Button>
    </div>
  </div>
</template>

<!-- Only keep PrimeVue specific overrides -->
<style>
@media (max-width: 640px) {
  input {
    @apply h-12 py-2 px-6 text-base;
  }
  
  button {
    @apply w-12 h-12;
  }
  
  .pi-search {
    @apply text-base;
  }
}
</style> 