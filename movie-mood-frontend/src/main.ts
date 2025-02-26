import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Rating from 'primevue/rating'
import App from './App.vue'

// PrimeVue styles
import 'primevue/resources/themes/lara-dark-teal/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Carousel from 'primevue/carousel'

const app = createApp(App)

// Use PrimeVue
app.use(PrimeVue, { ripple: true })

// Register components
app.component('Card', Card)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Carousel', Carousel)
app.component('Dialog', Dialog)
app.component('Rating', Rating)

app.mount('#app')
