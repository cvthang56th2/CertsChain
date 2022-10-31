<template>
  <div>
    <div class="relative">
      <button @click="goTo('/')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Home Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Instruction</h2>
    <div class="px-5 pt-5 pb-20 shadow-lg rounded-lg">
      <div class="mt-3">
        Hệ thống được thiết kế và phân ra 3 loại người dùng: Issuer, Holder và Verifier. Khi mới vào trang chủ, User cần chọn chức năng của mình đối với hệ thống để tiếp tục sử dụng.
        <div class="mt-1 text-blue-500 underline cursor-pointer hover:text-purple-500" @click="goTo('/instruction/issuer')">Xem hướng dẫn của người dùng loại Issuer</div>
        <div class="mt-1 text-blue-500 underline cursor-pointer hover:text-purple-500" @click="goTo('/instruction/holder')">Xem hướng dẫn của người dùng loại Holder</div>
        <div class="mt-1 text-blue-500 underline cursor-pointer hover:text-purple-500" @click="goTo('/instruction/verifier')">Xem hướng dẫn của người dùng loại Verifier</div>
        <img src="../assets/image/home.png" alt="home" class="mx-auto border-2 mt-4 mb-2">
        <div class="text-center text-sm italic">
          Trang Chủ
        </div>
      </div>
      <div class="mt-3">
        Nếu User chọn là Issuer hay Holder, người dùng cần phải đăng nhập vào tài khoản của mình để sử dụng các chức năng của Issuer, Holder.
        <img src="../assets/image/login.png" alt="login" class="mx-auto border-2 mt-4 mb-2">
        <div class="text-center text-sm italic">
          Trang Đăng nhập
        </div>
      </div>
      <div class="mt-3">
        Để xác minh văn bằng chứng chỉ, người dùng sẽ click vào button Verify Certificate:
        <a class="ml-1 text-blue-500 underline cursor-pointer hover:text-purple-500" @click="goTo('/instruction/verifier')">
          Xem hướng dẫn xác minh Văn bằng chứng chỉ
        </a>
        <img src="../assets/image/verifier/verify-certificate.png" alt="login" class="mx-auto border-2 mt-4 mb-2">
        <div class="text-center text-sm italic">
            Trang xác minh Văn bằng Chứng chỉ
        </div>
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