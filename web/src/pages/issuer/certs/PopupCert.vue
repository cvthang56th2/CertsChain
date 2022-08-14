<template>
  <Popup v-model="modelValue" @hide="hide" :title="certObj._id ? 'Edit Cert' : 'Add Cert'" width="60%" :save="saveCertificate" :closeOnSave="false" ref="popup">
    <div class="text-gray-700">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">User</div>
        <select v-model="formData.userId" class="border-2 p-2 m w-full" @change="onChangeUser">
          <!-- <option :value="undefined">Select User</option> -->
          <option v-for="(userObj, uIndex) in users" :key="`user-option-${uIndex}`" :value="userObj._id" :disabled="userObj.disabled" :class="userObj.disabled ? 'bg-gray-200' : ''">
            {{ [userObj.username, [userObj.firstName, userObj.lastName].filter(Boolean).join(' ')].join(' - ') }}
          </option>
        </select>
      </div>
      <div v-if="formData.userId" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">School</div>
        <select v-model="formData.schoolId" class="border-2 p-2 m w-full">
          <!-- <option :value="undefined">Select school</option> -->
          <option v-for="(schoolObj, sIndex) in schools" :key="`school-option-${sIndex}`" :value="schoolObj._id" :disabled="schoolObj.disabled" :class="schoolObj.disabled ? 'bg-gray-200' : ''">
            {{ schoolObj.name }}
          </option>
        </select>
      </div>
      <div v-if="formData.userId && formData.schoolId" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">Cource</div>
        <select v-model="formData.courceId" class="border-2 p-2 m w-full">
          <!-- <option :value="undefined">Select cource</option> -->
          <option v-for="(courceObj, cIndex) in cources" :key="`cource-option-${cIndex}`" :value="courceObj._id" :disabled="courceObj.disabled" :class="courceObj.disabled ? 'bg-gray-200' : ''">
            {{ [courceObj.name, courceObj.time].filter(Boolean).join(' - ') }}
          </option>
        </select>
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
    certObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
  },
  watch: {
    modelValue (v) {
      if (v) {
        this.formData = JSON.parse(JSON.stringify(this.certObj))
        this.getDataCreate()
      }
    }
  },
  data: () => ({
    formData: {},
    users: [],
  }),
  computed: {
    schools () {
      let result = []
      if (this.formData.userId) {
        const selectedUserObj = this.users.find(e => e._id === this.formData.userId) || {}
        result = (selectedUserObj.dropdownSchools || [])
      }
      return result
    },
    cources () {
      return (this.schools.find(e => e._id === this.formData.schoolId) || {}).cources || []
    }
  },
  methods: {
    hide() {
      this.$emit('update:modelValue', false)
    },
    onChangeUser () {
      this.formData.schoolId = null
      this.formData.courceId = null
      this.formData = { ...this.formData }
    },
    async getDataCreate() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate/get-data-create`)
        this.users = (data.users || [])
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async saveCertificate () {
      try {
        const payload = this.formData
        const { data } = await Axios.post(`${this.apiUrl}/certificate/${payload._id ? 'update' : 'create'}`, payload)
        if (data.error) {
          this.$swal(
            'Error',
            data.status,
            'error'
          );
          return
        }
        this.$emit('saved')
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: `${payload._id ? 'Update' : 'Generate'} Certificate Successfully!`,
        })
        this.$refs.popup.hide()
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