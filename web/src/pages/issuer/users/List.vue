<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Users</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupUser = true">Add User</button>
      <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="flex border-b-2 py-2 font-bold">
        <div class="w-1/6 whitespace-pre-wrap px-2">Username</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">Name</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">Email</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">Created At</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">Status</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">Actions</div>
      </div>
      <div v-for="(userObj, uIndex) in computedUsers" :key="`user-${uIndex}`" class="flex border-b-2 last:border-b-0 py-2">
        <div class="w-1/6 whitespace-pre-wrap px-2">{{ userObj.username }}</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">{{ [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') }}</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">{{ userObj.email }}</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">{{ formatDate(userObj.createdAt) }}</div>
        <div class="w-1/6 whitespace-pre-wrap px-2">
          <toggle v-model="userObj.status" trueValue="active" falseValue="archived" offLabel="Archived" onLabel="Active" @click="changeStatus(userObj._id)" />
        </div>
        <div class="w-1/6 whitespace-pre-wrap px-2">
          <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-400" @click="editUser(userObj)">Edit</button>
        </div>
      </div>
    </div>

    <PopupUser v-model="isShowPopupUser" @saved="getUsers()" :userObj="selectedUser" />
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import PopupUser from './PopupUser.vue'
import Axios from 'axios'
import Toggle from '@vueform/toggle'

export default {
  components: {
    PopupUser,
    Toggle
  },
  data: () => ({
    isShowPopupUser: false,
    users: [],
    keyword: null,
    selectedUser: {},
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
        console.log('error', error)        
      }
    },
    async changeStatus(userId) {
      await Axios.post(`${this.apiUrl}/user/${userId}/change-status`)
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