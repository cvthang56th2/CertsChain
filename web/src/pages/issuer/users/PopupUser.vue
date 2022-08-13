<template>
  <Popup v-model="modelValue" @hide="hide" :save="saveUser" :title="formData._id ? 'Edit User' : 'Add User'">
    <div class="text-gray-700">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Username</div>
        <input v-model="formData.username" :disabled="!!formData._id" class="px-4 py-2 border-b-2 w-2/3" type="text" name="username" placeholder="Username">
      </div>

      <div v-if="!formData._id" class="flex mb-4">
        <div class="px-4 py-2 font-semibold w-1/3">Password</div>
        <input v-model="formData.password" :disabled="!!formData._id" class="px-4 py-2 border-b-2 w-2/3" type="password" placeholder="Password">
      </div>

      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">First Name</div>
        <input v-model="formData.firstName" class="px-4 py-2 border-b-2 w-2/3" type="text" placeholder="First Name" name="first-name">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Last Name</div>
        <input v-model="formData.lastName" class="px-4 py-2 border-b-2 w-2/3" type="text" placeholder="Last Name" name="last-name">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Gender</div>
        <div class="flex items-center px-4">
          <div class="cursor-pointer" @click="$refs.genderMale.click()">
            <input ref="genderMale" type="radio" class="mr-2" v-model="formData.gender" value="male" /> Male
          </div>
          <div class="cursor-pointer ml-5" @click="$refs.genderFemale.click()">
            <input ref="genderFemale" type="radio" class="mr-2" v-model="formData.gender" value="female" /> Female
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Contact No.</div>
        <input v-model="formData.contactNo" class="px-4 py-2 border-b-2 w-2/3" type="text" placeholder="Contact No." name="contact-no">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Current Address</div>
        <input v-model="formData.currentAddress" class="px-4 py-2 border-b-2 w-2/3" type="text" placeholder="Current Address" name="address">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Permanant Address</div>
        <input v-model="formData.permanantAddress" class="px-4 py-2 border-b-2 w-2/3" type="text" placeholder="Permanant Address" name="address">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Email.</div>
        <input v-model="formData.email" class="px-4 py-2 border-b-2 w-2/3" type="email" placeholder="Email.">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Birthday</div>
        <input v-model="formData.birthday" class="px-4 py-2 border-b-2 w-2/3" type="date" placeholder="Birthday">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Status</div>
        <div class="flex items-center px-4">
          <div class="cursor-pointer" @click="$refs.statusActive.click()">
            <input ref="statusActive" type="radio" class="mr-2" v-model="formData.status" value="active" /> Active
          </div>
          <div class="cursor-pointer ml-5" @click="$refs.statusArchived.click()">
            <input ref="statusArchived" type="radio" class="mr-2" v-model="formData.status" value="archived" /> Archived
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Axios from 'axios'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    userObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
  },
  watch: {
    modelValue (v) {
      if (v) {
        this.formData = JSON.parse(JSON.stringify(this.userObj))
      }
    }
  },
  data: () => ({
    formData: {}
  }),
  methods: {
    hide() {
      this.$emit('update:modelValue', false)
    },
    async saveUser () {
      const api = this.formData._id ? 'update' : 'signup'
      try {
        const payload = this.formData
        const { data } = await Axios.post(`${import.meta.env.VITE_API_URL}/user/${api}`, payload)
        this.$emit('saved')
      } catch (error) {
        console.log('error', error)        
      }
    }
  }
}
</script>

<style>

</style>