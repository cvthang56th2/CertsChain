import Home from './Home.vue'
import Login from './Login.vue'
import Verifier from './verifier/Verifier.vue'
import Holder from './holder/Holder.vue'
import Issuer from './issuer/Issuer.vue'

export default [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/verifier', component: Verifier, meta: { userType: 'Verifier' } },
  { path: '/holder', component: Holder, meta: { userType: 'Holder' } },
  { path: '/issuer', component: Issuer, meta: { userType: 'Issuer' } },
]