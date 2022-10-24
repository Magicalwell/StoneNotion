import './public-path.js'
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import router from './router'
import store from './store'
import stApp from './views/index'

createApp(App).use(store).use(router).use(Antd).use(stApp).mount('#app')
