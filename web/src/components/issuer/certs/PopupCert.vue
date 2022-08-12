<template>
  <Popup v-model="modelValue" @hide="hide" :title="certObj._id ? 'Edit Cert' : 'Add Cert'" :save="saveCertificate">
    <div class="text-gray-700">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">User</div>
        <select v-model="formData.userId" class="border-2 p-2 m w-[200px]">
          <!-- <option :value="undefined">Select User</option> -->
          <option v-for="(userObj, uIndex) in users" :key="`user-option-${uIndex}`" :value="userObj._id">
            {{ [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') }}
          </option>
        </select>
      </div>
      <div class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">School</div>
        <select v-model="formData.schoolId" class="border-2 p-2 m w-[200px]">
          <!-- <option :value="undefined">Select school</option> -->
          <option v-for="(schoolObj, sIndex) in schools" :key="`school-option-${sIndex}`" :value="schoolObj._id">
            {{ schoolObj.name }}
          </option>
        </select>
      </div>
      <div v-if="formData.schoolId" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">Cource</div>
        <select v-model="formData.courceId" class="border-2 p-2 m w-[200px]">
          <!-- <option :value="undefined">Select cource</option> -->
          <option v-for="(courceObj, cIndex) in cources" :key="`cource-option-${cIndex}`" :value="courceObj._id">
            {{ courceObj.name }}
          </option>
        </select>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from '../../Popup.vue'
import Axios from 'axios'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    certObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Popup
  },
  watch: {
    modelValue (v) {
      if (v) {
        this.formData = JSON.parse(JSON.stringify(this.certObj))
        this.getSchools()
        this.getUsers()
      }
    }
  },
  data: () => ({
    formData: {},
    users: [],
    schools: [],
  }),
  computed: {
    cources () {
      return (this.schools.find(e => e._id === this.formData.schoolId) || {}).cources || []
    }
  },
  methods: {
    hide() {
      this.$emit('update:modelValue', false)
    },
    async getSchools() {
      try {
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/school/list`)
        this.schools = (data || []).filter(e => e.status !== 'archived')
      } catch (error) {
        console.log('error', error)        
      }
    },
    async getUsers() {
      try {
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/user/list`)
        this.users = (data || []).filter(e => e.status !== 'archived')
      } catch (error) {
        console.log('error', error)        
      }
    },
    async saveCertificate () {
      try {
        const payload = this.formData
        await Axios.post(`${import.meta.env.VITE_API_URL}/certificate/${payload._id ? 'update' : 'create'}`, payload)
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