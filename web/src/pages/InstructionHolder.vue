<template>
  <div>
    <div class="relative">
      <button @click="goTo('/instruction')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Instruction</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Holder's Instruction</h2>
    
    <div class="mt-2">
      Page:
      <button v-for="page of pages" class="ml-5 cursor-pointer" :class="currentPage === page ? 'bg-blue-800 text-white px-2 py-1' : 'text-blue-500'" @click="currentPage = page">{{page}}</button>
    </div>
    <template v-if="currentPage === 'Profile'">
      <div class="mt-2">
        Đây là trang thông tin cá nhân của Holder, có thể thực hiện chỉnh sửa các thông tin cá nhân của mình tại trang này bằng cách click vào button Edit. 
        <img src="../assets/image/holder/profile.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Trang Profile của Holder
        </div>
      </div>
    </template>
    
    <template v-if="currentPage === 'Certificates'">
      <div class="mt-2">
        Hiển thị danh sách các VBCC của Holder:
        <img src="../assets/image/holder/certificate-list.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Trang danh sách Certificate của Holder
        </div>
      </div>
      
      <div class="mt-2">
        Holder có thể tải xuống hoặc xem trực tiếp file chứng chỉ bằng cách click vào button View Certificate hay Download
      </div>
      
      <div class="mt-2">
        Ngoài ra,  Holder có thể lấy VBCC này chia sẻ cho nhà tuyển dụng hay bất kì ai bằng cách gửi mã số VBCC và file PDF cho Verifier.
      </div>
      
      <div class="mt-2">
        Hoặc click vào button Share ở certificate, thông tin chia sẻ của VBCC sẽ được hiển thị lên trong dialog như dưới:
        <img src="../assets/image/holder/certificate-share-box.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Popup chia sẻ thông tin Certificate
        </div>
      </div>
      
      <div class="mt-2">
        Tiếp đó, Holder có thể click vào button Copy to Clipboard để copy và gửi đi.
      </div>
    </template>
    <template v-if="currentPage === 'Certificate Requests'">
      
      <div class="mt-2">
        Hiển thị danh sách các yêu cầu cấp phát VBCC của Holder:
        <img src="../assets/image/holder/cert-request-list.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Trang Certificate Requests của Holder
        </div>
        
      </div>
      
      <div class="mt-2">
        Để tạo mới một yêu cầu cấp phát VBCC, Holder sẽ click vào button New Certificate Request, chọn Trường và khóa học sau đó gửi đi và đợi Issuer xử lý yêu cầu của mình.
        <img src="../assets/image/holder/cert-request-new.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Popup tạo mới yêu cầu cấp phát VBCC
        </div>
      </div>
      
    </template>

  </div>
</template>

<script>

export default {
  data: () => ({
    currentPage: 'Profile',
    pages: [
      'Profile',
      'Certificates',
      'Certificate Requests',
    ]
  }),
  methods: {
  }
}
</script>

<style>

</style>