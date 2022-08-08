<template>
  <Popup v-model="modelValue" @hide="hide" :title="certObj._id ? 'Edit Cert' : 'Add Cert'">
    <p class="my-4 text-slate-500 text-lg leading-relaxed">
      I always felt like I could do anything. That’s the main
      thing people are controlled by! Thoughts- their perception
      of themselves! They're slowed down by their perception of
      themselves. If you're taught you can’t do anything, you
      won’t do anything. I was taught I could do everything.
    </p>
  </Popup>
</template>

<script>
import Popup from '../../Popup.vue'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    certObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Popup
  },
  methods: {
    hide() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style>

</style>