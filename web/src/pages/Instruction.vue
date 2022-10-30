<template>
  <div>
    <div class="relative">
      <button @click="goTo('/')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Home Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Instruction</h2>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, animi eligendi assumenda nostrum consequatur doloremque itaque eum, voluptatum quos, velit similique accusamus sit ab quod vitae aperiam doloribus sequi fugit!
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
        if (!file || !this.formData.certinumber) {
          this.$swal(
            'Error',
            'Please fill all inputs',
            'error'
          );
          return
        }
        const formData = new FormData()
        formData.append('certinumber', this.formData.certinumber)
        formData.append('certificateFile', file)
        const { data } = await Axios.post(`${this.apiUrl}/certificate/verify`, formData)
        if (data.valid) {
          this.$swal(
            'Certificate is Valid',
            data.status,
            'success'
          );
        } else {
          this.$swal(
            'Certificate is In-Valid',
            data.status,
            'error'
          );
        }
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