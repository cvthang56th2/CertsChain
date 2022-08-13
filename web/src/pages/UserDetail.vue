<template>
  <div>
    <div class="relative">
      <button @click="goTo('/verifier?tab=UserList')" class="absolute top-2 underline text-blue-700">&#8592; Back to Verifier Page</button>
    </div>
    <Profile v-if="userData" :userData="userData" :editable="false" />
    <div v-else>
      User not found.
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import Profile from '../components/profile/Profile.vue'

export default {
  components: {
    Profile
  },
  data: () => ({
    userData: null
  }),
  mounted () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/user/${this.$route.params.userId}`)
        this.userData = data
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    }
  }
}
</script>

<style>

</style>