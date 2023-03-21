<template>
  <Popup v-model="modelValue" @hide="hide" :save="addCourses" :title="'Update User Courses'">
    <div class="text-gray-700">
      <h2 class="px-4 font-bold text-2xl text-center mb-4">User: {{ [userObj.firstName, userObj.lastname].filter(Boolean).join(' ') }} ({{userObj.username}})</h2>


      <div v-for="(itemObj, iIndex) in formData" :key="`school-course-${iIndex}`">
        <div class="flex justify-between items-center mt-4 mb-1">
          <div class="text-lg font-semibold">School and Course #{{iIndex + 1}}</div>
          <button v-if="formData.length > 1" class="rounded-sm border-2 px-5 py-1 bg-red-400 text-white text-sm" @click="formData.splice(iIndex, 1)">Remove</button>
        </div>
        <div class="flex">
          <div class="px-4 py-2 font-semibold w-1/3">School</div>
          <v-select :selectable="e => e && !e.disabled" appendToBody v-model="itemObj.schoolId" :options="filterSelectedSchool(itemObj.schoolId)" label="name" :reduce="e => e._id" class="w-full" @update:modelValue="itemObj.courseIds = null">
          </v-select>
        </div>
        <div class="flex mt-4">
          <div class="px-4 py-2 font-semibold w-1/3">Courses</div>
          <v-select :disabled="!itemObj.schoolId" :selectable="e => e && !e.disabled" appendToBody v-model="itemObj.courseIds" deselectFromDropdown multiple :options="getCourses(itemObj.schoolId)" :reduce="e => e._id" class="w-full" label="name">
          </v-select>
        </div>
      </div>

      <div class="px-4 text-center mt-5">
        <button :disabled="selectedSchoolIds.length === schools.length" :class="selectedSchoolIds.length === schools.length ? 'opacity-50 cursor-not-allowed' : ''" class="rounded-sm border-2 px-5 py-2 bg-green-400 text-white" @click="formData.push({})">Add School and Courses</button>
      </div>
    </div>
  </Popup>
</template>

<script>
import Axios from 'axios'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

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
    vSelect
  },
  filters: {
  },
  computed: {
    selectedSchoolIds () {
      return this.formData.map(e => e.schoolId)
    }
  },
  data: () => ({
    formData: [{}],
    oldJoined: [],
    schools: []
  }),
  watch: {
    modelValue (v) {
      if (v) {
        this.fetchData()
      }
    }
  },
  methods: {
    filterSelectedSchool(currentSchoolId) {
      return this.schools.filter(e => e._id === currentSchoolId || !this.selectedSchoolIds.includes(e._id))
    },
    async fetchData() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/user/${this.userObj._id}/get-data-update-courses`)
        this.oldJoined = data.joinedCourses || []
        this.formData = JSON.parse(JSON.stringify(data.joinedCourses || []))
        if (!this.formData.length) {
          this.formData.push({})
        }
        this.schools = data.schools || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    getCourses(schoolId) {
      return (this.schools.find(e => e._id === schoolId) || {}).courses || []
    },
    hide() {
      this.$emit('update:modelValue', false)
    },
    async addCourses () {
      this.setLoading()
      try {
        const payload = {
          userId: this.userObj._id,
          oldJoined: this.oldJoined,
          data: this.formData.filter(e => e.schoolId)
        }
        await Axios.post(`${this.apiUrl}/user/update-courses`, payload)
        this.$emit('saved')
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Update Courses Successfully!',
        })
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
      this.setLoading(false)
    }
  }
}
</script>

<style>

</style>