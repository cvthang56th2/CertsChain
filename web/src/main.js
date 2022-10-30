import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueCookies from 'vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import appPlugin from './plugins/appPlugin'
import routes from './pages/routes'

import {
  LOGIN_USER_ID_KEY
} from './constants/index'

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})
router.beforeEach((to, from, next) => {
  const userType = to.meta.userType
  if (['Issuer', 'Holder'].includes(userType)) {
    const userInfo = getCookie(LOGIN_USER_ID_KEY)
    if (!userInfo) {
      next({ path: `/login`, query: { cbUrl: to.path } })
    }
  }
  next()
})

const app = createApp(App)
app.use(VueSweetalert2);
app.use(router)
app.use(appPlugin)
app.use(VueCookies, { expire: '7d'})
app.use(createStore(store))
app.mount('#app')
