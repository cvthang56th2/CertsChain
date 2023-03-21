<template>
  <div>
    <div class="relative">
      <button @click="goTo('/instruction')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Instruction</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Issuer's Instruction</h2>
    <div class="px-5 pt-5 pb-20 shadow-lg rounded-lg">
      <div class="mt-3">
        Page:
        <button v-for="page of pages" class="ml-5 cursor-pointer" :class="currentPage === page ? 'bg-blue-800 text-white px-2 py-1' : 'text-blue-500'" @click="currentPage = page">{{page}}</button>
      </div>
      <template v-if="currentPage === 'Profile'">
        <div class="mt-3">
          Đây là trang thông tin cá nhân của Issuer, có thể thực hiện chỉnh sửa các thông tin cá nhân của mình tại trang này bằng cách click vào button Edit. 
          <img src="../assets/image/issuer/profile.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">Trang Profile của Issuer</div>
        </div>
      </template>
      <template v-if="currentPage === 'Users'">
        <div class="mt-3">
          Giúp Issuer có thể quản lý User trong hệ thống:
          <img src="../assets/image/issuer/user-list.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">Trang Users của Issuer</div>
        </div>
        <div class="mt-3">
          Issuer có thể thêm user vào bằng cách click vào button Add user, nhập đầy đủ thông tin của user và click vào button Save Changes, nếu thành công sẽ tạo ra một user mới và hiển thị ngay lập tức trên trang danh sách User
          <img src="../assets/image/issuer/user-add.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">Popup tạo mới User</div>
        </div>
        <div class="mt-3">
          Issuer có thể cập nhật thông tin User bằng cách click vào button Edit:
          <img src="../assets/image/issuer/user-edit.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">Popup cập nhật User</div>
        </div>
        
        <div class="mt-3">
          Issuer có thể cập nhật danh sách Courses của User bằng cách click vào button Update Courses:
          <img src="../assets/image/issuer/user-update-courses.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">Popup Cập nhật danh sách danh sách Courses của User tham gia</div>
        </div>
        
        <div class="mt-3">
          Issuer có thể cập nhật trạng thái hoạt động của User bằng cách click vào switch button Active/Archived trên trang danh sách Users
        </div>
  
      </template>
      <template v-if="currentPage === 'Schools and Courses'">
        <div class="mt-3">
          Giúp Issuer có thể quản lý trường học và khóa học trong hệ thống:
          <img src="../assets/image/issuer/school-course-list.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Trang Schools and Courses của Issuer
          </div>
        </div>
        <div class="mt-3">
          Issuer có thể tạo mới thông tin trường học, khóa học  bằng cách click vào button Add School 
          <img src="../assets/image/issuer/school-course-add.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Popup tạo mới School and Course
          </div>
        </div>
        <div class="mt-3">
          Issuer có thể cập nhật thông tin trường học, khóa học  bằng cách click vào button Edit
          <img src="../assets/image/issuer/school-course-edit.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Popup cập nhật School and Course
          </div>
        </div>
        <div class="mt-3">
          Issuer có thể cập nhật trạng thái hoạt động của trường học, khóa học bằng cách click vào switch button Active/Archived trên trang danh sách Schools and Courses
        </div>
        
      </template>
      <template v-if="currentPage === 'Certificates'">
        <div class="mt-3">
          Giúp Issuer có thể quản lý các VBCC trong hệ thống:
          Issuer có thể tạo mới thông tin trường học, khóa học  bằng cách click vào button Add School 
          <img src="../assets/image/issuer/certificate-list.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Trang Certificates của Issuer
          </div>
        </div>
        <div class="mt-3">
          Issuer có thể tạo mới VBCC bằng cách click vào button Add Certificate
          <img src="../assets/image/issuer/certificate-add.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Popup tạo mới Certificate
          </div>
        </div>
        
        <div class="mt-3">
          Tại Popup tạo mới Certificate có thể tạo mới một chứng chỉ cho 1 User duy nhất bằng cách chọn User, trường và khóa học của User có tham gia và nhấn Save Changes. Ngoài ra, Issuer có thể cấp phát cho tất cả học viên trong khóa học bằng cách click vào switch button Is Generate for Course?, chọn khóa học muốn cấp phát và click Save Changes.
          <img src="../assets/image/issuer/certificate-add-for-course.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Cấp nhát VBCC cho học viên trong khóa học
          </div>
        </div>
        
        <div class="mt-3">
          Sau khi nhập đầy đủ thông tin và click Save Changes, hệ thống sẽ tiến hành tạo mới VBCC, sinh ra một file PDF có định dạng như sau:
          <img src="../assets/image/issuer/certificate-sample.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Mẫu văn bằng chứng chỉ của CertsChain
          </div>
        </div>
        
        <div class="mt-3">
          Khi VBCC cần được cập nhật trạng thái, Issuer sẽ click vào switch button Active/Archived trên trang danh sách Certificates.
        </div>
      </template>
      <template v-if="currentPage === 'Certificate Requests'">
        
        <div class="mt-3">
          Giúp Issuer có thể quản lý các yêu cầu cấp phát VBCC trong hệ thống:
          <img src="../assets/image/issuer/cert-request-list.png" class="mx-auto border-2 mt-4 mb-2">
          <div class="text-center text-sm italic">
            Trang Certificate Requests của Issuer
          </div>
        </div>
        
        <div class="mt-3">
          Sau khi xét duyệt yêu cầu cấp phát VBCC, Issuer sẽ click vào button Approve nếu chấp thuận, Deny nếu từ chối yêu cầu cấp phát.
        </div>
        
        <div class="mt-3">
          Sau khi click vào button Approve, một VBCC mới sẽ được tạo ra và lưu vào hệ thống.
        </div>
      </template>
    </div>
    
  </div>
</template>

<script>

export default {
  data: () => ({
    currentPage: 'Profile',
    pages: [
      'Profile',
      'Users',
      'Schools and Courses',
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