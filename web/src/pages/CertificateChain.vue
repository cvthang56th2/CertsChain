<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Certificate Chain</h2>
    <div>
      <div v-for="(blockObj, bIndex) in certificateChain" :key="`block-certificate-${bIndex}`" class="w-full max-w-[800px] rounded-md shadow-md p-3 mb-5 mx-auto bg-slate-50 text-gray-800 relative"> 
        <div v-if="bIndex !== 0" class="h-[20px] w-[10px] absolute top-[-20px] left-1/2 -translate-1/2 bg-black">
        </div>
        <div><strong>Block #:</strong>  {{ bIndex }}</div>
        <div><strong>Nonce #:</strong>  {{ blockObj.nonce }}</div>
        <div><strong>Time #:</strong>  {{ formatDate(blockObj.createdAt) }}</div>
        <div><strong>Previous Hash #:</strong>  {{ blockObj.prehash }}</div>
        <div><strong>Hash #:</strong>  {{ blockObj.hash }}</div>
        <template v-if="blockObj.hash !== '#'">
          <div><strong>Owner:</strong> {{ blockObj.ownerName }}</div>
          <div><strong>School:</strong> {{ blockObj.schoolName }}</div>
          <div><strong>Course:</strong> {{ blockObj.courseName }}</div>
          <div><strong>Certificate link:</strong> <a :href="blockObj.certSrc" target="_blank" class="text-blue-500 hover:text-purple-500 underline">{{ blockObj.certSrc }}</a></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    certificateChain: []
  }),
  mounted () {
    this.getCertificateChain()
  },
  methods: {
    async getCertificateChain () {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate-chain`)
        this.certificateChain = data || []
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