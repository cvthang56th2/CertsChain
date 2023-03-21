<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="xl:flex flex-wrap">
      <template v-if="computedCerts.length">
        <div v-for="(certObj, cIndex) in computedCerts" :key="`cert-${cIndex}`" class="p-4 xl:w-1/3">
          <div class="px-8 py-4 bg-white rounded-md shadow-md ">
            <div class="flex items-center justify-between">
              <span class="text-sm font-light text-gray-600">{{ formatDate(certObj.createdAt, { format: 'DD/MM/YYYY' }) }}</span> 
              <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform rounded capitalize" :class="certObj.status === 'archived' ? 'bg-red-600' : 'bg-green-600'">{{ certObj.status }}</a>
            </div> 
            <div class="mt-2">
              <div class="font-semibold">
                #{{ certObj.certinumber }}              
              </div>
              <h4 class="text-2xl font-bold text-gray-700">
              {{ certObj.schoolId?.name }}
              </h4>
              <p class="mt-2 text-gray-600">
                {{ certObj.schoolId?.description }}
              </p>
              <h4 class="text-xl font-bold text-gray-700">
                {{ certObj.courseText }}
              </h4>
              <div class="flex items-center mt-4">
                Teacher: <span class="ml-2 font-bold text-gray-700">{{ certObj.courseObj?.teacherName }}</span>
              </div>
            </div> 
            <div class="xl:flex items-center justify-between mt-4">
              <a :href="certObj.certSrc" target="_blank" class="mt-4 xl:mt-0 mx-auto block xl:inline text-blue-600 hover:underline">View certificate ⟶</a> 
              <button @click.prevent="shareCertificate(certObj)" target="_blank" class="mt-4 xl:mt-0 mx-auto text-center block xl:inline bg-blue-500 hover:bg-blue-400 text-white py-2 px-5 rounded-md">Share</button> 
              <a :href="certObj.certSrc" @click.prevent="downloadItem(certObj.certSrc)" target="_blank" class="mt-4 xl:mt-0 mx-auto text-center block xl:inline bg-pink-500 hover:bg-pink-400 text-white p-2 rounded-md">Download ↓</a> 
            </div>
          </div>
        </div>
      </template>
      <div v-else class="text-center mt-4">
        No items
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    certs: [],
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
    }),
    computedCerts () {
      let result = JSON.parse(JSON.stringify(this.certs)).map(certObj => {
        const courseObj = (certObj.schoolId?.courses || []).find(e => e._id === certObj.courseId) || {}
        return {
          ...certObj,
          courseObj,
          courseText: [courseObj.name, courseObj.time].filter(Boolean).join(' - '),
        }
      })
      return result
    },
  },
  mounted () {
    this.getCerts()
  },
  methods: {
    shareCertificate (certObj) {
      this.$swal({
        title: 'Share Certificate Info',
        icon: 'info',
        html:`
        <div class="text-left">
          <div>User Profile: <a class="text-blue-600 hover:text-blue-400" href="${this.baseUrl}/user/${this.userInfo._id}" target="_blank" />${this.baseUrl}/user/${this.userInfo._id}</a></div>
          <div>Certificate Number: ${certObj.certinumber}</div>
          <div>Certificate file: <a class="text-blue-600 hover:text-blue-400" href="${certObj.certSrc}" target="_blank" />${certObj.certSrc}</a></div>
          <div>Verify Certificate at this link: <a class="text-blue-600 hover:text-blue-400" href="${this.baseUrl}/verify-certificate" target="_blank" />${this.baseUrl}/verify-certificate</a></div>
        </div>
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          'Copy to Clipboard',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then(res => {
        if (res.isConfirmed) {
          navigator.clipboard.writeText(`User Profile: ${this.baseUrl}/user/${this.userInfo._id}\nCertificate Number: ${certObj.certinumber}\nCertificate file: ${certObj.certSrc}\nVerify Certificate at this link: ${this.baseUrl}/verify-certificate`);
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Share info has been copied to clipboard!',
          })
        }
      })
    },
    async getCerts() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate/list?userId=${this.userInfo._id}`)
        this.certs = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );    
      }
    },
  }
}
</script>

<style>

</style>