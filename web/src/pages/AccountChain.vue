<template>
  <div>
    <div class="relative">
      <button @click="goTo('/verifier?tab=UserList')" class="absolute top-2 underline text-blue-700">&#8592; Back to Verifier Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Account Chain</h2>
    <div>
      <div v-for="(blockObj, bIndex) in accountChain" :key="`block-account-${bIndex}`" class="w-[800px] rounded-md shadow-md p-3 mb-5 mx-auto bg-slate-50 text-gray-800"> 
        <div><strong>Block #:</strong>  {{ bIndex }}</div>
        <div><strong>Username:</strong>  {{ blockObj.username }}</div>
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
    accountChain: []
  }),
  mounted () {
    this.getAccountChain()
  },
  methods: {
    async getAccountChain () {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/account-chain`)
        this.accountChain = data || []
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