<template>
  <div>
    <div class="relative">
      <button @click="goTo('/verifier?tab=CertificateList')" class="absolute top-2 underline text-blue-700">&#8592; Back to Verifier Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Verify Certificate</h2>
    <div class="mx-auto w-[600px] shadow-lg mt-20 p-10">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Certificate Number</div>
        <input v-model="formData.certinumber" class="px-4 py-2 border-b-2 w-2/3" type="text" name="certinumber" placeholder="Certificate Number...">
      </div>
      <div class="flex mt-4">
        <div class="px-4 py-2 font-semibold w-1/3">Certificate PDF File</div>
        <input ref="certificateFile" type="file" accept="application/pdf">
      </div>
      <div class="mt-10 text-center">
        <button @click="verifyCertificate" class="shadow-sm px-4 py-2 bg-blue-200">Verify Certificate</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    formData: {}
  }),
  methods: {
    async verifyCertificate () {
      try {
        const file = this.$refs.certificateFile.files[0]
        console.log('file', file)
        console.log('this.formData.certinumber', this.formData.certinumber)
        if (!file || !this.formData.certinumber) {
          alert('Please fill all inputs')
          return
        }
        const formData = new FormData()
        formData.append('certinumber', this.formData.certinumber)
        formData.append('certificateFile', file)
        const { data } = await Axios.post(`${this.apiUrl}/certificate/verify`, formData)
        console.log('data', data)
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style>

</style>