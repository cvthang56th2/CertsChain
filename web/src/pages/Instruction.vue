<template>
  <div>
    <div class="relative">
      <button @click="goTo('/')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Home Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Instruction</h2>
    <div class="mt-2">
      Xem hướng dẫn của người dùng loại:
      <button class="text-blue-500 ml-5 underline" @click="goTo('/instruction/issuer')">Issuer</button>
      <button class="text-blue-500 ml-5 underline" @click="goTo('/instruction/holder')">Holder</button>
      <button class="text-blue-500 ml-5 underline" @click="goTo('/instruction/verifier')">Verifier</button>
    </div>
    <div class="mt-2">
      Hệ thống được thiết kế và phân ra 3 loại người dùng: Issuer, Holder và Verifier. Khi mới vào trang chủ, User cần chọn chức năng của mình đối với hệ thống để tiếp tục sử dụng.
      <img src="../assets/image/home.png" alt="home" class="mx-auto">
    </div>
    <div class="mt-2">
      Nếu User chọn là Issuer hay Holder, người dùng cần phải đăng nhập vào tài khoản của mình để sử dụng các chức năng của Issuer, Holder.
      <img src="../assets/image/login.png" alt="login" class="mx-auto">
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