<template>
  <div class="p-10 h-screen overflow-auto">
    <div>
      <h1 class="text-2xl font-bold block w-full text-center mb-4 xl:w-[unset] xl:absolute top-3 left-10 cursor-pointer" @click="goTo('/')">CERTSCHAIN</h1>
      <button class="block w-full mb-4 xl:mt-0 xl:w-[unset] xl:absolute top-1 right-10 px-4 py-1 text-xl shadow-lg bg-cyan-500 text-white font-semibold" @click="goTo('/verify-certificate')">Verify Certificate</button>
      <button class="block w-full mb-4 xl:mt-0 xl:w-[unset] xl:absolute top-1 right-[240px] px-4 py-1 text-xl shadow-lg bg-cyan-500 text-white font-semibold" @click="goTo('/instruction')">Instruction</button>
      <button class="block w-full mb-4 xl:mt-0 xl:w-[unset] xl:absolute top-1 right-[388px] px-4 py-1 text-xl shadow-lg bg-cyan-500 text-white font-semibold" @click="goTo('/introduction')">Introduction</button>
    </div>
    <router-view />
    
    <div v-if="isLoading" class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,.3)] z-[9999]">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { LOGIN_USER_ID_KEY } from './constants'
import Axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
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
input:not([type=radio], [type=checkbox], [type=file]) {
  height: 44px;
}
input.vs__search {
  height: 34px;
}
.toggle-container {
  min-height: 40px;
}
.toggle-label {
  position: absolute;
  bottom: -24px;
  left: 0;
  color: black;
  font-weight: bold;
}
.toggle.toggle-on .toggle-label {
  left: 6px;
}
.vs__dropdown-option {
  padding-top: 7px !important;
  padding-bottom: 7px !important;
}
.vs__dropdown-option.vs__dropdown-option--selected {
  background-color: rgb(26, 166, 236);
  color: #fff
}
.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
