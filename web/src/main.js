import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueCookies from 'vue-cookies'
import { createStore } from 'vuex'
import store from './store'

import appPlugin from './plugins/appPlugin'

const app = createApp(App)
app.use(appPlugin)
app.use(VueCookies, { expire: '7d'})
app.use(createStore(store))
app.mount('#app')
