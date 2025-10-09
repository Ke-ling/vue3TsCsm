import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).mount('#app')
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_BASE_API)
console.log(process.env.VUE_APP_ENV)
