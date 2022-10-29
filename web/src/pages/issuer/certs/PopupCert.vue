<template>
  <Popup v-model="modelValue" @hide="hide" :title="certObj._id ? 'Edit Cert' : 'Add Cert'" width="60%" :save="saveCertificate" :closeOnSave="false" ref="popup">
    <div class="text-gray-700 popup-cert">
      <div class="flex items-center">
        <div class="px-4 py-2 font-semibold w-1/3">Is Generate for Cource?</div>
        <div>
          <toggle v-model="isGenerateForCource" :trueValue="true" :falseValue="false" offLabel="Yes" onLabel="No"  @update:modelValue="onChangeToggle" />
        </div>
      </div>
      <div v-if="!isGenerateForCource" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">User</div>
        <v-select appendToBody v-model="formData.userId" :options="users" :reduce="e => e._id" class="w-full" @update:modelValue="onChangeUser" />
      </div>
      <div v-if="isGenerateForCource || (!isGenerateForCource && formData.userId)" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">School</div>
        <v-select appendToBody v-model="formData.schoolId" :options="schools" :reduce="e => e._id" class="w-full" @update:modelValue="onChangeSchool">
          <template #no-options>
            User not join any School
          </template>
        </v-select>
      </div>
      <div v-if="(isGenerateForCource || (!isGenerateForCource && formData.userId)) && formData.schoolId" class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">Cource</div>
        <v-select appendToBody v-model="formData.courceId" :options="cources" :reduce="e => e._id" class="w-full">
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
    isGenerateForCource: false,
    formData: {},
    listSchool: [],
    users: [],
  }),
  computed: {
    schools () {
      let result = []
      if (this.isGenerateForCource) {
        result = this.listSchool
      } else if (this.formData.userId) {
        const selectedUserObj = this.users.find(e => e._id === this.formData.userId) || {}
        result = (selectedUserObj.dropdownSchools || [])
      }
      return result.map(e => ({
        ...e,
        label: e.name
      }))
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
    onChangeToggle () {
      this.formData = {}
    },
    hide() {
      this.$emit('update:modelValue', false)
    },
    async onChangeUser () {
      this.formData.schoolId = null
      this.formData.courceId = null
      await this.$nextTick(() => {
        if (this.schools.length === 1) {
          this.formData.schoolId = this.schools[0]._id
        }
      })
      await this.$nextTick(() => {
        if (this.availabelCources.length === 1) {
          this.formData.courceId = this.availabelCources[0]._id
        }
      })
      this.formData = { ...this.formData }
    },
    async onChangeSchool () {
      this.formData.courceId = null
      await this.$nextTick(() => {
        if (this.availabelCources.length === 1) {
          this.formData.courceId = this.availabelCources[0]._id
        }
      })
      this.formData = { ...this.formData }
    },
    async getDataCreate() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate/get-data-create`)
        this.users = (data.users || []).map(userObj => ({
          ...userObj,
          label: `${[userObj.firstName, userObj.lastName].filter(Boolean).join(' ')} (${userObj.username})`
        }))
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
          ...JSON.parse(JSON.stringify(this.formData)),
          isGenerateForCource: this.isGenerateForCource
        }
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

.popup-cert  .toggle-label {
  position: relative;
  bottom: unset;
  left: unset;
  color: white;
  font-weight: bold;
}
</style>