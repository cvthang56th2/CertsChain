<template>
  <div class="flex flex-col h-full">
    <div class="relative">
      <button @click="goTo('/')" class="relative xl:top-2 xl:absolute block underline text-blue-700">&#8592; Select other user type</button>
      <template v-if="$route.path !== '/login'">
        <h1 class="text-center text-3xl font-extrabold uppercase">{{ userType }}</h1>
        <div v-if="['Issuer', 'Holder'].includes(userType) && isLogin" class="relative xl:top-2 xl:right-0 xl:absolute">
          Hello, <span class="font-bold text-lg">{{userInfo && userInfo.username}}</span>!
          <button class="ml-4 underline hover:text-purple-500" @click="logout">
            Logout
          </button>
        </div>
      </template>
    </div>
    <div class="flex-1 mt-5">
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
      this.$swal({
        title: 'Do you want to Logout?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.$cookies.set(LOGIN_USER_ID_KEY, '')
          this.$store.commit('auth/SET_USER_INFO', {})
          this.$store.commit('auth/SET_IS_LOGIN', false)
          this.goTo('/login')
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Logout Successfully!',
          })
        }
      })
    }
  },
  async mounted () {
  }
}
</script>

<style>

</style>