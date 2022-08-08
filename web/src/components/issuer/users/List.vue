<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Users</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupUser = true">Add User</button>
      <input v-model="keyword" type="text" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="flex border-b-2 py-2 font-bold">
        <div class="w-1/5 px-2 text-center">Name</div>
        <div class="w-1/5 px-2 text-center">Email</div>
        <div class="w-1/5 px-2 text-center">Created At</div>
        <div class="w-1/5 px-2 text-center">Status</div>
        <div class="w-1/5 px-2 text-center">Actions</div>
      </div>
      <div v-for="(userObj, uIndex) in computedUsers" :key="`user-${uIndex}`" class="flex border-b-2 last:border-b-0 py-2">
        <div class="w-1/5 px-2">{{ [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') }}</div>
        <div class="w-1/5 px-2">{{ userObj.email }}</div>
        <div class="w-1/5 px-2">{{ userObj.createdAt }}</div>
        <div class="w-1/5 px-2 capitalize text-center cursor-pointer" @click="changeStatus(userObj._id)">{{ userObj.status }}</div>
        <div class="w-1/5 px-2">
          <div class="flex justify-center">
            <div>
              <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-400" @click="editUser(userObj)">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PopupUser v-model="isShowPopupUser" @saved="getUsers()" :userObj="selectedUser" />
  </div>
</template>

<script>
import PopupUser from './PopupUser.vue'
import Axios from 'axios'

export default {
  components: {
    PopupUser
  },
  data: () => ({
    isShowPopupUser: false,
    users: [],
    keyword: null,
    selectedUser: {}
  }),
  watch: {
    isShowPopupUser (v) {
      if (!v) {
        this.selectedUser = {}
      }
    }
  },
  computed: {
    computedUsers () {
      let result = JSON.parse(JSON.stringify(this.users))
      if (this.keyword) {
        let reg = new RegExp(this.keyword, 'gi')
        result = result.filter(item => (
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
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/user/list`)
        this.users = data || []
      } catch (error) {
        console.log('error', error)        
      }
    },
    async changeStatus(userId) {
      await Axios.post(`${import.meta.env.VITE_API_URL}/user/${userId}/change-status`)
      this.getUsers()
    },
    editUser(userObj) {
      this.selectedUser = userObj
      this.isShowPopupUser = true
    }
  }
}
</script>

<style>

</style>