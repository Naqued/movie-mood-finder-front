import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'

// PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App)

// Use PrimeVue
app.use(PrimeVue, { ripple: true })

// Register components
app.component('Card', Card)
app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app')
