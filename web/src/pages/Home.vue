<template>
  <div>
    <h1 class="text-center text-3xl font-extrabold">SELECT USER TYPE</h1>
    <div class="flex mt-20">
      <div class="w-full xl:w-1/3 px-10">
        <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="goTo('/issuer')">
          <div class="w-[200px] h-[200px] rounded-full border-4 mx-auto bg bg-center bg-cover bg-no-repeat" style="background-image: url(/issuer-icon.png)"></div>
          <h5 class="mt-5 text-xl font-semibold uppercase">Issuer</h5>
        </div>
      </div>
      <div class="w-full xl:w-1/3 px-10">
        <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="goTo('/holder')">
          <div class="w-[200px] h-[200px] rounded-full border-4 mx-auto bg bg-center bg-cover bg-no-repeat" style="background-image: url(/holder-icon.png)"></div>
          <h5 class="mt-5 text-xl font-semibold uppercase">Holder</h5>
        </div>
      </div>
      <div class="w-full xl:w-1/3 px-10">
        <div class="text-center cursor-pointer p-4 border-2 hover:shadow-md" @click="goTo('/verifier')">
          <div class="w-[200px] h-[200px] rounded-full border-4 mx-auto bg bg-center bg-cover bg-no-repeat" style="background-image: url(/verifier-icon.png)"></div>
          <h5 class="mt-5 text-xl font-semibold uppercase">Verifier</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>