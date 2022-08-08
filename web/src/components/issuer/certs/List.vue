<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupCert = true">Add Cert</button>
      <input type="text" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="flex border-b-2 py-2 font-bold">
        <div class="w-1/4 px-2 text-center">Head 1</div>
        <div class="w-1/4 px-2 text-center">Head 2</div>
        <div class="w-1/4 px-2 text-center">Head 3</div>
        <div class="w-1/4 px-2 text-center">Actions</div>
      </div>
      <div v-for="i in [1,2,3,4,5]" :key="i" class="flex border-b-2 last:border-b-0 py-2">
        <div class="w-1/4 px-2">Field 1</div>
        <div class="w-1/4 px-2">Field 2</div>
        <div class="w-1/4 px-2">Field 3</div>
        <div class="w-1/4 px-2">
          <div class="flex justify-center">
            <div>
              <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-400">Edit</button>
            </div>
            <div class="ml-2">
              <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-red-400">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PopupCert v-model="isShowPopupCert" />
  </div>
</template>

<script>
import PopupCert from './PopupCert.vue'
export default {
  components: {
    PopupCert
  },
  data: () => ({
    isShowPopupCert: false
  })
}
</script>

<style>

</style>