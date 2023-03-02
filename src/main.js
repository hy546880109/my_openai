import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' 
createApp(App).mount('#app')
axios.defaults.baseURL = 'https://api.openai.com'
App.prototype.$http = axios