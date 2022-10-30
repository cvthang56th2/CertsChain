<template>
  <div>
    <div class="relative">
      <button @click="goTo('/instruction')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Instruction</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Holder's Instruction</h2>
    <div class="px-5 pt-5 pb-20 shadow-lg rounded-lg">
      <div class="mt-3">
        Page:
        <button v-for="page of pages" class="ml-5 cursor-pointer" :class="currentPage === page ? 'bg-blue-800 text-white px-2 py-1' : 'text-blue-500'" @click="currentPage = page">{{page}}</button>
      </div>
      <template v-if="currentPage === 'Users'">
        <div class="mt-3">
          Hiển thị ra tất cả các Users có trong hệ thống
          <img src="../assets/image/verifier/user-list.png" class="mx-auto">
          <div class="text-center text-sm italic">
            Danh sách tất cả các User trong hệ thống
          </div>
        </div>
        
        <div class="mt-3">
          Bất kì ai cũng có thể xem chi tiết thông tin công khai của user trong hệ thống. Bằng cách click vào button View Detail.
          <img src="../assets/image/verifier/user-detail.png" class="mx-auto">
          <div class="text-center text-sm italic">
            Trang chi tiết User
          </div>
        </div>
      </template>
  
      <template v-if="currentPage === 'Certificates'">
        <div class="mt-3">
          Hiển thị tất cả các certificate có trong hệ thống, bất kì ai cũng có thể xem danh sách này.
          <img src="../assets/image/verifier/certificate-list.png" class="mx-auto">
          <div class="text-center text-sm italic">
            Danh sách tất cả các certificate trong hệ thống
          </div>
        </div>
      </template>
      
      <template v-if="currentPage === 'Verify Certificates'">
        
        <div class="mt-3">
          Trang này dùng để User có thể xác minh VBCC
          <ul>
            <li>
              -	Có được cấp phát bởi hệ thống hay không .
            </li>
            <li>
              -	Có bị thay đổi gì không.
            </li>
            <li>
              -	Có còn đang được công nhận hay đang còn hiệu lựu hay không.
            </li>
          </ul>
          <img src="../assets/image/verifier/verify-certificate.png" class="mx-auto">
          <div class="text-center text-sm italic">
            Trang xác minh VBCC
          </div>
        </div>
        <div class="mt-3">
          User truy cập vào trang, nhập mã số, chọn file PDF của VBCC và click Verify Certificate để xác minh tính xác thực của VBCC.
        </div>
        <div class="ml-3">
          <div class="mt-3">
            <div class="font-medium">* Nếu đây là một VBCC hợp lệ</div>
            <div>Hệ thống sẽ thông báo như sau</div>
            <img src="../assets/image/verifier/verify-valid.png" class="mx-auto">
          </div>
          <div class="mt-3">
            <div class="font-medium">* Nếu VBCC không hợp lệ</div>
            <div>Hệ thống sẽ thông báo như sau</div>
            <div class="mt-3">-	VBCC không được cấp phát bởi hệ thống</div>
            <img src="../assets/image/verifier/verify-invalid-not-found.png" class="mx-auto">
            <div class="mt-3">-	VBCC đã bị sửa chữa</div>
            <img src="../assets/image/verifier/verify-invalid-modified.png" class="mx-auto">
            <div class="mt-3">-	VBCC không còn hiệu lực</div>
            <img src="../assets/image/verifier/verify-invalid-archived.png" class="mx-auto">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    currentPage: 'Users',
    pages: [
      'Users',
      'Certificates',
      'Verify Certificates'
    ]
  }),
  methods: {
  }
}
</script>

<style>

</style>