<template>
  <div>
    <div class="relative">
      <button @click="goTo('/verifier?tab=CertificateList')" class="absolute top-2 underline text-blue-700">&#8592; Back to Verifier Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Certificate Chain</h2>
    <div>
      <div v-for="(blockObj, bIndex) in certificateChain" :key="`block-certificate-${bIndex}`" class="w-[800px] rounded-md shadow-md p-3 mb-5 mx-auto bg-slate-50 text-gray-800"> 
        <div><strong>Block #:</strong>  {{ bIndex }}</div>
        <div><strong>Nonce #:</strong>  {{ blockObj.nonce }}</div>
        <div><strong>Time #:</strong>  {{ blockObj.timestamp }}</div>
        <div><strong>Previous Hash #:</strong>  {{ blockObj.prehash }}</div>
        <div><strong>Hash #:</strong>  {{ blockObj.hash }}</div>
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