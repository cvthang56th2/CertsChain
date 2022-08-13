<template>
  <div class="p-10 h-screen overflow-auto">
    <router-view />
  </div>
</template>

<script>
import { USER_INFO_KEY } from './constants'
export default {
  async mounted () {
    const userInfo = this.$cookies.get(USER_INFO_KEY)
    if (userInfo) {
      this.$store.commit('auth/SET_USER_INFO', userInfo)
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
