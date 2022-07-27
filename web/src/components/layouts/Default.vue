<template>
  <div class="p-20">
    <template v-if="userType">
      <div class="relative">
        <button @click="changeUserType(null)" class="absolute top-2 underline text-blue-700">&#8592; Select other user type</button>
        <h1 class="text-center text-3xl font-extrabold uppercase">{{ userType }}</h1>
        <div v-if="isLogin" class="absolute top-2 right-0">
          Hello, World!
          <button class="ml-4 underline" @click="logout">
            Logout
          </button>
        </div>
      </div>
      <div class="mt-5">
        <template v-if="['Issuer', 'Holder'].includes(userType)">
          <component v-if="isLogin" :is="userType" />
          <Login v-else />
        </template>
        <Verifier v-else />
      </div>
    </template>
    <template v-else>
      <h1 class="text-center text-3xl font-extrabold">SELECT USER TYPE</h1>
      <div class="flex mt-20">
        <div class="w-full xl:w-1/3 px-10">
          <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="changeUserType('Issuer')">
            <div class="w-[200px] h-[200px] bg-red-50 rounded-md mx-auto"></div>
            <h5 class="mt-5 text-xl font-semibold uppercase">Issuer</h5>
          </div>
        </div>
        <div class="w-full xl:w-1/3 px-10">
          <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="changeUserType('Holder')">
            <div class="w-[200px] h-[200px] bg-green-50 rounded-md mx-auto"></div>
            <h5 class="mt-5 text-xl font-semibold uppercase">Holder</h5>
          </div>
        </div>
        <div class="w-full xl:w-1/3 px-10">
          <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="changeUserType('Verifier')">
            <div class="w-[200px] h-[200px] bg-blue-50 rounded-md mx-auto"></div>
            <h5 class="mt-5 text-xl font-semibold uppercase">Verifier</h5>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  USER_COOKIE_KEY,
  LOGIN_KEY
} from '../../constants'
import Issuer from '../issuer/Issuer.vue'
import Holder from '../holder/Holder.vue'
import Verifier from '../verifier/Verifier.vue'
import { mapGetters } from 'vuex'
import Login from '../auth/Login.vue'

export default {
  components: {
    Issuer,
    Holder,
    Verifier,
    Login,
  },
  computed: {
    ...mapGetters({
      userType: 'userType',
      isLogin: 'auth/isLogin'
    })
  },
  methods: {
    changeUserType (type) {
      this.$store.commit('SET_USER_TYPE', type)
      this.$cookies.set(USER_COOKIE_KEY, type)
    },
    logout () {
      // TODO
      this.$cookies.set(LOGIN_KEY, false)
      this.$store.commit('auth/SET_IS_LOGIN', false)
    }
  },
  mounted () {
    this.$store.commit('auth/SET_IS_LOGIN', this.$cookies.get(LOGIN_KEY) === 'true')
    const cookieUserType = this.$cookies.get(USER_COOKIE_KEY)
    if (['Issuer', 'Holder', 'Verifier'].includes(cookieUserType)) {
      this.$store.commit('SET_USER_TYPE', cookieUserType)
    } else {
      this.$cookies.set(USER_COOKIE_KEY, null)
    }
  }
}
</script>

<style>

</style>