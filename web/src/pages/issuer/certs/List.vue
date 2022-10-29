<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="flex justify-between items-center">
      <div>
        <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupCert = true">Add Cert</button>
        <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
      </div>
      <div class="flex">
        <div>
          <v-select appendToBody v-model="schoolId" :options="schools" label="name" :reduce="e => e._id" class="w-[300px]" @update:modelValue="courceId = null" placeholder="School" />
        </div>
        <div class="ml-2">
          <v-select appendToBody v-model="courceId" :options="cources" label="name" :reduce="e => e._id" class="w-[300px]" placeholder="Cource" :disabled="!schoolId" />
        </div>
      </div> 
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mb-4">
      <div class="hidden xl:flex border-b-2 py-2 font-bold">
        <div class="xl:w-1/5 px-2">Certificate Number</div>
        <div class="xl:w-1/5 px-2">User</div>
        <div class="xl:w-1/5 px-2">School and Cource</div>
        <div class="xl:w-1/5 px-2">Link</div>
        <div class="xl:w-1/5 px-2">Status</div>
      </div>
      
      <template v-if="computedCerts.length">
        <div v-for="(certObj, cIndex) in computedCerts" :key="`cert-${cIndex}`" class="xl:flex border-b-2 last:border-b-0 py-2">
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">Certificate Number:</b> {{ certObj.certinumber }}</div>
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">User:</b> {{ certObj.userName }}</div>
          <div class="xl:w-1/5 px-2"><b class="xl:hidden">School and Cource:</b> {{ certObj.schoolAndCource }}</div>
          <div class="xl:w-1/5 px-2">
            <b class="xl:hidden">Link:</b> <a :href="certObj.certSrc" target="_blank" class="underline text-blue-600 hover:text-blue-400">{{ certObj.fileName }}</a>
          </div>
          <div class="mb-10 xl:mb-0 xl:w-1/5 px-2">
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
    courceId: null,
    keyword: null
  }),
  computed: {
    computedCerts () {
      let result = JSON.parse(JSON.stringify(this.certs)).map(certObj => {
        const courceObj = (certObj.schoolId?.cources || []).find(e => e._id === certObj.courceId) || {}
        const splitted = (certObj.certSrc || '').split('/')
        const fileName = splitted[splitted.length - 1]
        return {
          ...certObj,
          fileName,
          userName: [certObj.userId?.username, [certObj.userId?.firstName, certObj.userId?.lastName].filter(Boolean).join(' ')].filter(Boolean).join('-'),
          schoolAndCource: [certObj.school?.name, courceObj.name, courceObj.time].filter(Boolean).join(' - '),
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