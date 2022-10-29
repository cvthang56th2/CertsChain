<template>
  <Popup v-model="modelValue" @hide="hide" :title="'New Certificate Request'" width="60%" :save="saveCertificate" :closeOnSave="false" ref="popup">
    <div class="text-gray-700">
      <div class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">School</div>
        <v-select appendToBody v-model="formData.schoolId" class="w-full" :options="schools" :reduce="e => e._id" label="name" @update:modelValue="onChangeSchool">
          <template #no-options>
            User not join any School
          </template>
        </v-select>
      </div>
      <div v-if="formData.schoolId" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">Cource</div>
        <v-select appendToBody v-model="formData.courceId" class="w-full" :options="cources" :reduce="e => e._id">
          <template #no-options>
            User not join any cources at this School.
          </template>
        </v-select>
      </div>
    </div>
  </Popup>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import Axios from 'axios'
import Toggle from '@vueform/toggle'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    Toggle,
    vSelect
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
      return ((this.schools.find(e => e._id === this.formData.schoolId) || {}).cources || []).map(courceObj => ({
        ...courceObj,
        label: [courceObj.name, courceObj.time].filter(Boolean).join(' - ')
      }))
    },
    availabelCources () {
      return this.cources.filter(e => !e.disabled)
    }
  },
  methods: {
    async onChangeSchool () {
      this.formData.courceId = null
      await this.$nextTick(() => {
        if (this.availabelCources.length === 1) {
          this.formData.courceId = this.availabelCources[0]._id
        }
      })
      this.formData = { ...this.formData }
    },
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