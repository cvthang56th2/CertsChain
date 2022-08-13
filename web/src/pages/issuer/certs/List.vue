<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupCert = true">Add Cert</button>
      <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="flex border-b-2 py-2 font-bold">
        <div class="w-1/5 px-2">Certificate Number</div>
        <div class="w-1/5 px-2">User</div>
        <div class="w-1/5 px-2">School and Cource</div>
        <div class="w-1/5 px-2">Link</div>
        <div class="w-1/5 px-2">Status</div>
      </div>
      <div v-for="(certObj, cIndex) in computedCerts" :key="`cert-${cIndex}`" class="flex border-b-2 last:border-b-0 py-2">
        <div class="w-1/5 px-2">{{ certObj.certinumber }}</div>
        <div class="w-1/5 px-2">{{ certObj.userName }}</div>
        <div class="w-1/5 px-2">{{ certObj.schoolAndCource }}</div>
        <div class="w-1/5 px-2">
          <a :href="certObj.certSrc" target="_blank" class="underline text-blue-600 hover:text-blue-400">{{ certObj.certSrc }}</a>
        </div>
        <div class="w-1/5 px-2">
          <toggle v-model="certObj.status" trueValue="active" falseValue="archived" offLabel="Archived" onLabel="Active" @click="changeStatus(certObj._id)" />
        </div>
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

export default {
  components: {
    PopupCert,
    Toggle
  },
  data: () => ({
    isShowPopupCert: false,
    certs: [],
    keyword: null
  }),
  computed: {
    computedCerts () {
      let result = JSON.parse(JSON.stringify(this.certs)).map(certObj => {
        const courceObj = (certObj.schoolId?.cources || []).find(e => e._id === certObj.courceId) || {}
        return {
          ...certObj,
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
      return result
    },
  },
  mounted () {
    this.getCerts()
  },
  methods: {
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