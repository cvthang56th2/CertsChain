<template>
  <div>
    <div v-if="modelValue" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="`relative my-6 mx-auto" :style="`width: ${width}`">
        <!--content-->
        <div class="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{ title }}
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="hide()">
              <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto max-h-[75vh] overflow-y-auto">
            <slot />
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="hide()">
              Close
            </button>
            <button class="text-green-500 hover:bg-green-500 hover:text-white background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="onClickSave()">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modelValue" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "large-modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '80%'
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    save: {
      type: Function,
      default: () => (() => {})
    },
    closeOnSave: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    onClickSave () {
      if (typeof this.save === 'function') {
        this.save()
      }
      if (this.closeOnSave) {
        this.hide()
      }
    }
  }
}
</script>