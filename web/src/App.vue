<template>
  <div class="p-10 h-screen overflow-auto">
    <router-view />
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
