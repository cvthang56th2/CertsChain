<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="flex justify-between items-center flex-col xl:flex-row">
      <div class="flex flex-col xl:flex-row">
        <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400 hover:bg-green-400 hover:text-white" @click="isShowPopupCert = true">Add Cert</button>
        <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="mt-2 xl:mt-0 xl:ml-4 border-2 px-2 rounded-md">
      </div>
      <div class="flex flex-col xl:flex-row">
        <div class="mt-2 xl:mt-0">
          <v-select :selectable="e => e && !e.disabled" appendToBody v-model="schoolId" :options="schools" label="name" :reduce="e => e._id" class="w-[300px]" @update:modelValue="courseId = null" placeholder="School" />
        </div>
        <div class="mt-2 xl:mt-0 xl:ml-2">
          <v-select :selectable="e => e && !e.disabled" appendToBody v-model="courseId" :options="courses" label="name" :reduce="e => e._id" class="w-[300px]" placeholder="Course" :disabled="!schoolId" />
        </div>
      </div> 
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-md shadow-md mb-4">
      <div class="hidden xl:flex border-b-2 py-2 font-bold">
        <div class="xl:w-1/6 px-2">Certificate Number</div>
        <div class="xl:w-1/6 px-2">User</div>
        <div class="xl:w-1/6 px-2">School and Course</div>
        <div class="xl:w-1/6 px-2">Created At</div>
        <div class="xl:w-1/6 px-2">Link</div>
        <div class="xl:w-1/6 px-2">Status</div>
      </div>
      
      <template v-if="computedCerts.length">
        <div v-for="(certObj, cIndex) in computedCerts" :key="`cert-${cIndex}`" class="xl:flex items-center border-b-2 last:border-b-0 py-2">
          <div class="xl:w-1/6 px-2"><b class="xl:hidden">Certificate Number:</b> {{ certObj.certinumber }}</div>
          <div class="xl:w-1/6 px-2"><b class="xl:hidden">User:</b> {{ certObj.userName }}</div>
          <div class="xl:w-1/6 px-2"><b class="xl:hidden">School and Course:</b> {{ certObj.schoolAndCourse }}</div>
          <div class="xl:w-1/6 px-2"><b class="xl:hidden">Created At:</b> {{ formatDate(certObj.createdAt) }}</div>
          <div class="xl:w-1/6 px-2">
            <b class="xl:hidden">Link:</b> <a :href="certObj.certSrc" target="_blank" class="underline text-blue-600 hover:text-blue-400">{{ certObj.fileName }}</a>
          </div>
          <div class="mb-10 xl:mb-0 xl:w-1/6 px-2">
            <b class="xl:hidden">Status:</b> <toggle v-model="certObj.status" trueValue="active" falseValue="archived" offLabel="Archived" onLabel="Active" @click="changeStatus(certObj._id)" />
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-4">
        No items
      </div>
    </div>

    <PopupCert v-model="isShowPopupCert" @saved="getCerts" />
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import PopupCert from './PopupCert.vue'
import Axios from 'axios'
import Toggle from '@vueform/toggle'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    PopupCert,
    Toggle,
    vSelect
  },
  data: () => ({
    isShowPopupCert: false,
    certs: [],
    schools: [],
    schoolId: null,
    courseId: null,
    keyword: null
  }),
  computed: {
    computedCerts () {
      let result = JSON.parse(JSON.stringify(this.certs)).map(certObj => {
        const courseObj = (certObj.schoolId?.courses || []).find(e => e._id === certObj.courseId) || {}
        const splitted = (certObj.certSrc || '').split('/')
        const fileName = splitted[splitted.length - 1]
        return {
          ...certObj,
          fileName,
          userName: [certObj.userId?.username, [certObj.userId?.firstName, certObj.userId?.lastName].filter(Boolean).join(' ')].filter(Boolean).join('-'),
          schoolAndCourse: [certObj.school?.name, courseObj.name, courseObj.time].filter(Boolean).join(' - '),
        }
      })
      if (this.keyword) {
        let reg = new RegExp(this.keyword, 'gi')
        result = result.filter(item => (
          (item.certinumber && item.certinumber.match(reg)) ||
          (item.userName && item.userName.match(reg)) ||
          (item.schoolAndCourse && item.schoolAndCourse.match(reg))
        ))
      }
      if (this.schoolId) {
        result = result.filter(e => (e.schoolId?._id || e.schoolId) === this.schoolId)
        if (this.courseId) {
          result = result.filter(e => (e.courseId?._id || e.courseId) === this.courseId)
        }
      }
      return result
    },
    courses () {
      return (this.schools.find(e => e._id === this.schoolId) || {}).courses || []
    }
  },
  mounted () {
    this.getCerts()
    this.getSchools()
  },
  methods: {
    async getSchools() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/school/list`)
        this.schools = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async getCerts() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate/list`)
        this.certs = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async changeStatus(certId) {
      await Axios.post(`${this.apiUrl}/certificate/${certId}/change-status`)
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: 'Change Status Successfully!',
      })
      this.getCerts()
    },
  }
}
</script>

<style>

</style>