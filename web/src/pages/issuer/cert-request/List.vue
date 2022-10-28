<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certificate Requests</h2>
    <div class="flex justify-between items-center">
      <div>
        <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
      </div>
      <div class="flex">
        <div>
          <select v-model="schoolId" class="border-2 p-2">
            <option value="">Select School</option>
            <option v-for="(schoolObj, sIndex) in schools" :key="`school-option-${sIndex}`" :value="schoolObj._id">
              {{ schoolObj.name }}
            </option>
          </select>
        </div>
        <div v-if="schoolId" class="ml-2">
          <select v-model="courceId" class="border-2 p-2">
            <option value="">Select Cource</option>
            <option v-for="(courceObj, cIndex) in cources" :key="`cource-option-${cIndex}`" :value="courceObj._id">
              {{ [courceObj.name, courceObj.time].filter(Boolean).join(' - ') }}
            </option>
          </select>
        </div>
      </div>      
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="hidden xl:flex border-b-2 py-2 font-bold">
        <div class="xl:w-1/5 px-2">User</div>
        <div class="xl:w-1/5 px-2">School and Cource</div>
        <div class="xl:w-1/5 px-2">Created At</div>
        <div class="xl:w-1/5 px-2">Status</div>
        <div class="xl:w-1/5 px-2">Actions</div>
      </div>
      
      <template v-if="computedCertRequests.length">
        <div v-for="(certRequestObj, cIndex) in computedCertRequests" :key="`cert-${cIndex}`" class="xl:flex border-b-2 last:border-b-0 py-2">
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">User:</b> {{ certRequestObj.userName }}</div>
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">School and Cource:</b> {{ certRequestObj.schoolAndCource }}</div>
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">Created At:</b> {{ formatDate(certRequestObj.createdAt) }}</div>
          <div class="xl:w-1/5 px-2 capitalize"><b class="xl:hidden">Status:</b> {{ certRequestObj.status }}</div>
          <div class="mb-10 xl:mb-0 xl:w-1/5 px-2">
            <b class="xl:hidden">Actions:</b>
            <template v-if="!certRequestObj.status || certRequestObj.status === 'pending'">
              <button class="px-2 py-1 rounded-md cursor-pointer bg-green-600 text-white" @click="changeStatus(certRequestObj._id, 'approved')">Approve</button>
              <button class="px-2 py-1 ml-4 rounded-md cursor-pointer bg-red-600 text-white" @click="changeStatus(certRequestObj._id, 'denied')">Deny</button>
            </template>
            <span v-else class="capitalize px-2 py-1 rounded-sm text-white" :class="certRequestObj.status === 'approved' ? 'bg-green-600' : 'bg-red-600'">{{ certRequestObj.status }}</span>
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-4">
        No items
      </div>
    </div>
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import Axios from 'axios'

export default {
  components: {
  },
  data: () => ({
    certRequests: [],
    schools: [],
    schoolId: '',
    courceId: '',
    keyword: null
  }),
  computed: {
    computedCertRequests () {
      let result = JSON.parse(JSON.stringify(this.certRequests)).map(certRequestObj => {
        const courceObj = (certRequestObj.schoolId?.cources || []).find(e => e._id === certRequestObj.courceId) || {}
        const splitted = (certRequestObj.certRequestSrc || '').split('/')
        const fileName = splitted[splitted.length - 1]
        return {
          ...certRequestObj,
          fileName,
          userName: [certRequestObj.userId?.username, [certRequestObj.userId?.firstName, certRequestObj.userId?.lastName].filter(Boolean).join(' ')].filter(Boolean).join('-'),
          schoolAndCource: [certRequestObj.school?.name, courceObj.name, courceObj.time].filter(Boolean).join(' - '),
        }
      })
      if (this.keyword) {
        let reg = new RegExp(this.keyword, 'gi')
        result = result.filter(item => (
          (item.certinumber && item.certinumber.match(reg)) ||
          (item.userName && item.userName.match(reg)) ||
          (item.schoolAndCource && item.schoolAndCource.match(reg))
        ))
      }
      if (this.schoolId) {
        result = result.filter(e => (e.schoolId?._id || e.schoolId) === this.schoolId)
        if (this.courceId) {
          result = result.filter(e => (e.courceId?._id || e.courceId) === this.courceId)
        }
      }
      return result
    },
    cources () {
      return (this.schools.find(e => e._id === this.schoolId) || {}).cources || []
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
        const { data } = await Axios.get(`${this.apiUrl}/certiRequest/list`)
        this.certRequests = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async changeStatus(certRequestId, status) {
      this.$swal({
        title: `Are you sure when to ${status} this request?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          await Axios.post(`${this.apiUrl}/certiRequest/${certRequestId}/change-status`, {
            status
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