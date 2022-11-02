<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Users</h2>
    <div class="flex">
      <!-- <button class="border-2 px-5 py-1 rounded-md cursor-pointer border-blue-400" @click="goTo('/account-chain')">Account Chain</button> -->
      <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-md shadow-md mb-4">
      <div class="hidden xl:flex border-b-2 py-2 font-bold">
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Username</div>
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Name</div>
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Email</div>
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Created At</div>
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Status</div>
        <div class="xl:w-1/6 whitespace-pre-wrap px-2">Actions</div>
      </div>
      <template v-if="computedUsers.length">
        <div v-for="(userObj, uIndex) in computedUsers" :key="`user-${uIndex}`" class="xl:flex border-b-2 last:border-b-0 py-2">
          <div class="xl:w-1/6 whitespace-pre-wrap px-2">
            <b class="xl:hidden">Username:</b>{{ userObj.username }}</div>
          <div class="xl:w-1/6 whitespace-pre-wrap px-2">
            <b class="xl:hidden">Name:</b>{{ [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') }}</div>
          <div class="xl:w-1/6 whitespace-pre-wrap px-2">
            <b class="xl:hidden">Email:</b>{{ userObj.email }}</div>
          <div class="xl:w-1/6 whitespace-pre-wrap px-2">
            <b class="xl:hidden">Created At:</b>{{ formatDate(userObj.createdAt) }}</div>
          <div class="xl:w-1/6 whitespace-pre-wrap px-2 capitalize">
            <b class="xl:hidden">Status:</b>{{ userObj.status }}
          </div>
          <div class="xl:w-1/6 whitespace-pre-wrap px-2">
            <b class="xl:hidden">Actions: </b>
            <button class="border-2 px-5 py-1 rounded-md cursor-pointer border-blue-400" @click="goTo(`/user/${userObj._id}`)">View Detail</button>
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-4">
        No items
      </div>
    </div>

  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import Axios from 'axios'

export default {
  components: {
  },
  data: () => ({
    users: [],
    keyword: null,
  }),
  watch: {
  },
  computed: {
    computedUsers () {
      let result = JSON.parse(JSON.stringify(this.users))
      if (this.keyword) {
        let reg = new RegExp(this.keyword, 'gi')
        result = result.filter(item => (
          (item.username && item.username.match(reg)) ||
          (item.name && item.name.match(reg)) ||
          (item.firstName && item.firstName.match(reg)) ||
          (item.lastName && item.lastName.match(reg)) ||
          (item.email && item.email.match(reg)) ||
          (item.status && item.status.match(reg)) ||
          (item.gender && item.gender.match(reg))
        ))
      }
      return result
    },
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/user/list`)
        this.users = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );      
      }
    },
  }
}
</script>

<style>

</style>