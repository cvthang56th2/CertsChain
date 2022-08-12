<template>
  <Popup v-model="modelValue" @hide="hide" :save="saveSchool" :title="formData._id ? 'Edit School' : 'Add School'">
    <div class="text-gray-700">
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Name</div>
        <input v-model="formData.name" class="px-4 py-2 border-b-2 w-2/3" type="text" name="name" placeholder="Name...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Director Name</div>
        <input v-model="formData.directorName" class="px-4 py-2 border-b-2 w-2/3" type="text" name="directorName" placeholder="Director Name...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Description</div>
        <textarea v-model="formData.description" class="px-4 py-2 border-b-2 w-2/3" name="Description" placeholder="Description..."></textarea>
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Address</div>
        <input v-model="formData.address" class="px-4 py-2 border-b-2 w-2/3" type="text" name="address" placeholder="Address...">
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Contact</div>
        <input v-model="formData.contact" class="px-4 py-2 border-b-2 w-2/3" type="text" name="contact" placeholder="Contact...">
      </div>
      <div v-for="(courceObj, cIndex) in formData.cources" :key="`user-cource-${cIndex}`">
        <div class="flex">
          <div class="px-4 py-2 font-semibold w-1/3">Cource #{{cIndex + 1}}</div>
          <div class="px-4 py-2 border-b-2 w-2/3 flex items-center">
            <div class="w-4/5 pr-2">
              <div class="flex items-stretch">
                <div class="w-1/2 flex flex-col justify-between">
                  <label class="font-semibold">Name</label>
                  <div>
                    <input v-model="courceObj.name" class="border-b-2 p-1 w-full" type="text" name="name" placeholder="Name...">
                  </div>
                </div>
                <div class="w-1/2 flex flex-col justify-between">
                  <label class="font-semibold">Teacher Name</label>
                  <div>
                    <input v-model="courceObj.teacherName" class="border-b-2 p-1 w-full" type="text" name="teacherName" placeholder="Teacher Name...">
                  </div>
                </div>
              </div>
              <div class="flex items-end mt-4">
                <div class="w-1/2 flex flex-col justify-between pl-2">
                  <label class="font-semibold">Description</label>
                  <div>
                    <textarea v-model="courceObj.description" class="border-b-2 p-1 w-full" name="Description" placeholder="Description..."></textarea>
                  </div>
                </div>
                <div class="w-1/2 flex flex-col justify-between pl-2">
                  <label class="font-semibold">Time</label>
                  <div>
                    <input v-model="courceObj.time" class="border-b-2 p-1 w-full" type="text" name="time" placeholder="Time...">
                  </div>
                </div>
              </div>
            </div>
            <div class="w-1/5">
              <button class="p-1 border-2 border-red-500 rounded-md" @click="removeCource(cIndex)">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="w-1/3"></div>
        <div class="flex items-center px-4">
          <button
            class="block w-full text-green-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs px-3 py-1 mb-4 mt-2"
            @click="addCource"
          >
            Add Cource
          </button>
        </div>
      </div>
      <div class="flex">
        <div class="px-4 py-2 font-semibold w-1/3">Status</div>
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
import Popup from '../../Popup.vue'
import Axios from 'axios'

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
    Popup
  },
  watch: {
    modelValue (v) {
      if (v) {
        this.formData = JSON.parse(JSON.stringify(this.schoolObj))
        if (!this.formData?.cources) {
          this.formData.cources = [{}]
        }
      }
    }
  },
  data: () => ({
    formData: {}
  }),
  methods: {
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
      try {
        const payload = {
          _id: this.formData._id,
          data: this.formData
        }
        await Axios.post(`${import.meta.env.VITE_API_URL}/school/save`, payload)
        this.$emit('saved')
      } catch (error) {
        console.log('error', error)        
      }
    }
  }
}
</script>

<style>

</style>