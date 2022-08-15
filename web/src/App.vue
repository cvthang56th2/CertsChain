<template>
  <div class="p-10 h-screen overflow-auto">
    <router-view />

    <button v-if="$route.path !== '/verify-certificate'" class="absolute bottom-4 left-1/2 px-5 py-2 text-xl shadow-lg bg-cyan-500 text-white font-semibold -translate-x-1/2" @click="goTo('/verify-certificate')">Verify Certificate</button>
  </div>
</template>

<script>
import { LOGIN_USER_ID_KEY } from './constants'
import Axios from 'axios'

export default {
  async mounted () {
    const userId = this.$cookies.get(LOGIN_USER_ID_KEY)
    if (userId) {
      const { data } = await Axios.get(`${this.apiUrl}/user/${userId}`)
      this.$store.commit('auth/SET_USER_INFO', data)
      this.$store.commit('auth/SET_IS_LOGIN', true)
    }
  }
}
</script>

<style>
#app {
}
.toggle-label {
  position: absolute;
  bottom: -24px;
  left: 0;
  color: black;
  font-weight: bold;
}
</style>
