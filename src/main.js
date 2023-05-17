import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'
import api from "@/utils/api";
import common from "@/utils/common";
import VueCookies from 'vue-cookies'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)
app.use(VueCookies)
app.config.globalProperties.$api = api
app.config.globalProperties.$common = common
app.mount('#app')