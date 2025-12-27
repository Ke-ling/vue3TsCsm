import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
// 从element-plus中导入所有图标 并进行注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store).use(router).mount('#app')

// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_API)
// console.log(process.env.VUE_APP_ENV)
