<template>
  <Popup v-model="modelValue" @hide="hide" :title="certObj._id ? 'Edit Cert' : 'Add Cert'">
  </Popup>
</template>

<script>
import Popup from '../../Popup.vue'
import Axios from 'axios'

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
  watch: {
    modelValue (v) {
      if (v) {
        this.getSchools()
        this.getUsers()
      }
    }
  },
  data: () => ({
    users: [],
    schools: [],
  }),
  methods: {
    hide() {
      this.$emit('update:modelValue', false)
    },
    async getSchools() {
      try {
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/school/list`)
        this.schools = (data || []).filter(e => e.status !== 'archived')
      } catch (error) {
        console.log('error', error)        
      }
    },
    async getUsers() {
      try {
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/user/list`)
        this.users = (data || []).filter(e => e.status !== 'archived')
      } catch (error) {
        console.log('error', error)        
      }
    },
  }
}
</script>

<style>

</style>