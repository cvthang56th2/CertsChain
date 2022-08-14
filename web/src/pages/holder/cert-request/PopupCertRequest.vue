<template>
  <Popup v-model="modelValue" @hide="hide" :title="'New Certificate Request'" width="60%" :save="saveCertificate" :closeOnSave="false" ref="popup">
    <div class="text-gray-700">
      <div class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">School</div>
        <select v-model="formData.schoolId" class="border-2 p-2 m w-full">
          <!-- <option :value="undefined">Select school</option> -->
          <option v-for="(schoolObj, sIndex) in schools" :key="`school-option-${sIndex}`" :value="schoolObj._id" :disabled="schoolObj.disabled" :class="schoolObj.disabled ? 'bg-gray-200' : ''">
            {{ schoolObj.name }}
          </option>
        </select>
      </div>
      <div v-if="formData.schoolId" class="flex mt-4">
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
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import Axios from 'axios'
import Toggle from '@vueform/toggle'

export default {
  components: {
    Toggle
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
    },
    certObj: {
      type: Object,
      default: () => ({})
    }
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
    listSchool: [],
    users: [],
  }),
  computed: {
    schools () {
      let result = []
      if (this.userId) {
        const selectedUserObj = this.users.find(e => e._id === this.userId) || {}
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
        this.listSchool = data.schools || []
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
        const payload = {
          data: {
            ...JSON.parse(JSON.stringify(this.formData)),
            userId: this.userId
          }
        }
        const { data } = await Axios.post(`${this.apiUrl}/certiRequest/save`, payload)
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
          title: `Send Certificate Request Successfully!`,
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