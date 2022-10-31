<template>
  <div>
    <div class="relative">
      <button @click="goTo('/')" class="xl:absolute top-2 underline text-blue-700">&#8592; Back to Home Page</button>
    </div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Introduction</h2>
    <div class="px-5 pt-5 pb-20 shadow-lg rounded-lg">
      <div class="mt-3">
        Xin chào,
      </div>
      <div class="mt-3">
        Tôi là <b>Cao Viết Thắng</b>, một lập trình viên Fullstack NodeJS Developer, đang học lớp cao học <b>61CH.CNTT</b>, MSSV: <b>61CH.097</b>. Đây là web app tôi tạo ra để demo cho hệ thống <b>CertsChain</b> - một hệ thống về quản lý văn bằng chứng chỉ dựa trên công nghệ <b>BlockChain</b>. Tôi dùng web app này để demo cho luận văn tốt nghiệp thạc sĩ của mình.
      </div>
      <div class="mt-3">
        <div class="font-medium text-lg">Hệ thống được xây dựng dựa trên mô hình như sau:</div>
        <img src="../assets/image/certschain-diagram.png" class="mx-auto">
        <div class="text-center text-sm italic">
          Mô hình thực hiện của hệ thống
        </div>
      </div>
      <div class="mt-3 font-medium text-lg">
        Quy trình  thực hiện:
      </div>
      <div>1) Các đơn vị đào tạo - Issuer sẽ có một hệ thống quản lý thông tin học sinh, sinh viên hay Holder, từ hệ thống CertsChain này Holder đủ điều kiện được cấp VBCC sẽ yêu cầu đơn vị đào tạo cấp VBCC cho mình.</div>
      <div>2) Issuer xem xét yêu cầu cấp VBCC của Holder, nếu xác nhận thì hệ thống CertsChain sẽ thực hiện:</div>
      <div class="ml-4">- Tạo VBCC dưới dạng file PDF.</div>
      <div class="ml-4">- Tạo một block mới lưu thông tin VBCC, mã số VBCC và thông tin file PDF trên CertsChain Blockchain</div>
      <div class="ml-4">- Cập nhật hệ thống CertsChain để Holder có thể xem, và chia sẽ VBCC.</div>
      <div>3) Holder muốn chia sẽ CBCC có thể truy cập vào hệ thống CertsChain để lấy file PDF, mã số VBCC và gửi cho một bên thứ ba (nhà tuyển dụng - Verifier) xác thực</div>
      <div>4) Verifier truy cập vào hệ thống CertsChain, nhập mã số VBCC, file PDF để xác minh VBCC có hợp lệ hay không.</div>
  
      <div class="mt-3">
        <div class="font-medium text-lg">Môi trường triển khai và công cụ phát triển của hệ thống:</div>
        <div class="font-medium text-md">
          Môi trường triển khai
        </div>
        <div>
          <div>Hệ thống được cài đặt trên instance ubutun của AWS có cấu hình như sau:</div>
          <div class="ml-4">-	Properties: Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type, 64bit, 8GB Storage.</div>
          <div class="ml-4">-	NodeJS: 16</div>
          <div class="ml-4">-	Blockchain: tự phát triển, sử dụng NodeJS để tạo ra 1 class Blockchain bao gồm các thuộc tính và phương thức thường có của 1 hệ thống BlockChain.</div>
          <div class="ml-4">-	MongoDB: cơ sở dữ liệu dưới dạng NoSQL, dùng lưu trữ và truy vấn dữ liệu User, Certificate,…</div>
        </div>
        <div class="font-medium text-md">
          Công cụ phát triển
        </div>
        Là một hệ thống quản trị cần nhiều thao tác với Server nên tốc độ người dùng là vô cùng quan trọng nên hệ thống này tôi quyết định xây dựng dưới dạng là một Web Application Single Page.
        <div class="ml-4">
          <b>- FrontEnd:</b> Sử dụng ngôn ngữ chính để viết FrontEnd là Vue.js - một thư viện NodeJS hiện đại và phổ biến hiện nay, giúp viết những ứng dụng web Single Page dễ dàng hơn.
        </div>
        
        <div class="ml-4">
          <b>- BackEnd</b>: BackEnd tôi sử dụng NodeJS - Express để triển khai xây dựng danh sách các API giúp ứng dụng web giao tiếp với hệ thống, database cũng như Blockchain.
        </div>
        <div class="font-medium text-md">
          BlockChain: Code BlockChain sẽ được tôi tự xây dựng bằng NodeJS và chạy ở  Backend, Một số thư viện của NodeJS được tôi sử dụng:
        </div>
        <div class="ml-4">-	Sha256: thư viện tạo mã băm SHA256, sử dụng để tạo các giá trị băm. Nó tạo ra một giá trị băm 256 bit. Dùng để băm dữ liệu trong hệ thống Blockchain</div>
        <div class="ml-4">-	Pdfkit: thư viện giúp sinh ra các file PDF, tôi sử dụng để tạo ra các file VBCC dưới định dạng PDF.</div>
        <div class="ml-4">-	Qrcode: thư viện giúp tạo ra các mã QR code. Tôi dùng nó để tạo ra các mã QR và in lên trên file VBCC.</div>
        <div class="ml-4">-	Mongoose: thư viện giúp giao tiếp với CSDL MongoDB một cách dễ dàng với NodeJS.</div>
      </div>
      <div class="mt-3">
        Cảm ơn đã ghé thăm web app, bất cứ thắc mắc, câu hỏi hay feedback gì vui lòng liên hệ tới gmail: <a class="text-blue-500 underline hover:text-purple-500 cursor-pointer" href="mailto:cvthang56th2@gmail.com">cvthang56th2@gmail.com</a>.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
  }),
  methods: {
  }
}
</script>

<style>

</style>