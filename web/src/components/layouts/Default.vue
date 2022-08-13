<template>
  <div>
    <div class="relative">
      <button @click="goTo('/')" class="absolute top-2 underline text-blue-700">&#8592; Select other user type</button>
      <template v-if="$route.path !== '/login'">
        <h1 class="text-center text-3xl font-extrabold uppercase">{{ userType }}</h1>
        <div v-if="['Issuer', 'Holder'].includes(userType) && isLogin" class="absolute top-2 right-0">
          Hello, {{userInfo && userInfo.username}}!
          <button class="ml-4 underline" @click="logout">
            Logout
          </button>
        </div>
      </template>
    </div>
    <div class="mt-5">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  LOGIN_USER_ID_KEY
} from '../../constants'
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters({
      isLogin: 'auth/isLogin',
      userInfo: 'auth/userInfo'
    }),
    userType () {
      return this.$route.meta.userType
    }
  },
  methods: {
    logout () {
      // TODO
      this.$cookies.set(LOGIN_USER_ID_KEY, '')
      this.$store.commit('auth/SET_USER_INFO', {})
      this.$store.commit('auth/SET_IS_LOGIN', false)
      this.goTo('/login')
    }
  },
  async mounted () {
  }
}
</script>

<style>

</style>