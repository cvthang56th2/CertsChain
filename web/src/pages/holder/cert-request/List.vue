<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certificate Requests</h2>
    <div class="flex justify-between items-center flex-col xl:flex-row">
      <div class="flex flex-col xl:flex-row">
        <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400 hover:bg-green-400 hover:text-white" @click="isShowPopupCertRequest = true">New Certificate Request</button>
        <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="mt-2 x:mt-0 xl:ml-4 border-2 px-2 rounded-md">
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
        <div class="xl:w-1/4 px-2">User</div>
        <div class="xl:w-1/4 px-2">School and Course</div>
        <div class="xl:w-1/4 px-2">Created At</div>
        <div class="xl:w-1/4 px-2">Status</div>
      </div>
      
      <template v-if="computedCertRequests.length">
        <div v-for="(certRequestObj, cIndex) in computedCertRequests" :key="`cert-${cIndex}`" class="xl:flex border-b-2 last:border-b-0 py-2">
          <div class="xl:w-1/4 px-2"><b class="xl:hidden">User:</b> {{ certRequestObj.userName }}</div>
          <div class="xl:w-1/4 px-2"><b class="xl:hidden">School and Course:</b> {{ certRequestObj.schoolAndCourse }}</div>
          <div class="xl:w-1/4 px-2"><b class="xl:hidden">Created At:</b> {{ formatDate(certRequestObj.createdAt) }}</div>
          <div class="xl:w-1/4 px-2 capitalize"><b class="xl:hidden">Status:</b> 
            <span class="capitalize px-2 py-1 rounded-sm" :class="certRequestObj.status === 'pending' ? 'text-blue-600' : (certRequestObj.status === 'approved' ? 'text-green-600' : 'text-red-600')">{{ certRequestObj.status }}</span>
            <button v-if="certRequestObj.status === 'pending'" @click="cancelRequest(certRequestObj._id, 'denied')" class="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-300">Cancel</button>
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-4">
        No items
      </div>
    </div>

    <PopupCertRequest v-model="isShowPopupCertRequest" :userId="userInfo._id" @saved="getCertRequests" />
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import Axios from 'axios'
import { mapGetters } from 'vuex'
import PopupCertRequest from './PopupCertRequest.vue'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    PopupCertRequest,
    vSelect
  },
  data: () => ({
    isShowPopupCertRequest: false,
    certRequests: [],
    schools: [],
    schoolId: null,
    courseId: null,
    keyword: null
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
    }),
    computedCertRequests () {
      let result = JSON.parse(JSON.stringify(this.certRequests)).map(certRequestObj => {
        const courseObj = (certRequestObj.schoolId?.courses || []).find(e => e._id === certRequestObj.courseId) || {}
        const splitted = (certRequestObj.certRequestSrc || '').split('/')
        const fileName = splitted[splitted.length - 1]
        return {
          ...certRequestObj,
          fileName,
          userName: [certRequestObj.userId?.username, [certRequestObj.userId?.firstName, certRequestObj.userId?.lastName].filter(Boolean).join(' ')].filter(Boolean).join('-'),
          schoolAndCourse: [certRequestObj.school?.name, courseObj.name, courseObj.time].filter(Boolean).join(' - '),
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
      return ((this.schools.find(e => e._id === this.schoolId) || {}).courses || []).map(courseObj => ({
        ...courseObj,
        label: [courseObj.name, courseObj.time].filter(Boolean).join(' - ')
      }))
    }
  },
  mounted () {
    this.getCertRequests()
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
    async getCertRequests() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certiRequest/list?userId=${this.userInfo._id}`)
        this.certRequests = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async cancelRequest(certRequestId) {
      this.$swal({
        title: `Are you sure when to cancel this request?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          await Axios.post(`${this.apiUrl}/certiRequest/${certRequestId}/change-status`, {
            status: 'canceled'
          })
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: `Successfully!`,
          })
          this.getCertRequests()
        }
      })
    },
  }
}
</script>

<style>

</style>