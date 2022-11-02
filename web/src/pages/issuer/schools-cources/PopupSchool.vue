<template>
  <Popup v-model="modelValue" @hide="hide" :save="saveSchool" :title="formData._id ? 'Edit School' : 'Add School'">
    <div class="text-gray-700">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Name</div>
        <input v-model="formData.name" class="px-4 py-2 border-b-2 w-2/3" type="text" name="name" placeholder="Name...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Director Name</div>
        <input v-model="formData.directorName" class="px-4 py-2 border-b-2 w-2/3" type="text" name="directorName" placeholder="Director Name...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Description</div>
        <textarea v-model="formData.description" class="px-4 py-2 border-b-2 w-2/3" name="Description" placeholder="Description..."></textarea>
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Address</div>
        <input v-model="formData.address" class="px-4 py-2 border-b-2 w-2/3" type="text" name="address" placeholder="Address...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Contact</div>
        <input v-model="formData.contact" class="px-4 py-2 border-b-2 w-2/3" type="text" name="contact" placeholder="Contact...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/4">Status</div>
        <div class="flex items-center px-4">
          <div class="cursor-pointer" @click="$refs.statusActive.click()">
            <input ref="statusActive" type="radio" class="mr-2" v-model="formData.status" value="active" /> Active
          </div>
          <div class="cursor-pointer ml-5" @click="$refs.statusArchived.click()">
            <input ref="statusArchived" type="radio" class="mr-2" v-model="formData.status" value="archived" /> Archived
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    schoolObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    vSelect,
  },
  watch: {
    modelValue (v) {
      if (v) {
        this.getUsers()
        this.formData = JSON.parse(JSON.stringify(this.schoolObj))
        if (!this.formData?.cources) {
          this.formData.cources = [{}]
        }
      }
    },
  },
  data: () => ({
    formData: {},
    users: []
  }),
  computed: {
    formattedUsers () {
      return this.users.map(userObj => ({
        ...userObj,
        label: [userObj.firstName, userObj.lastName].filter(Boolean).join(' ')
      }))
    }
  },
  methods: {
    async getUsers() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/user/list`)
        this.users = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    hide() {
      this.$emit('update:modelValue', false)
    },
    addCource () {
      this.formData.cources.push({})
      this.formData.cources = [...this.formData.cources]
    },
    removeCource (eIndex) {
      this.formData.cources.splice(eIndex, 1)
      this.formData.cources = [...this.formData.cources]
    },
    async saveSchool () {
      this.setLoading()
      try {
        const payload = {
          _id: this.formData._id,
          data: this.formData
        }
        await Axios.post(`${this.apiUrl}/school/save`, payload)
        this.$emit('saved')
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Save Successfully!',
        })
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
      this.setLoading(false)
    }
  }
}
</script>

<style>

</style>