<template>
  <Popup v-model="modelValue" @hide="hide" :save="saveSchool" :title="'Courses Management'">
    <div class="text-gray-700">
      <div class="text-center">
        <div class="font-bold text-2xl mb-4">List Courses in {{ formData.name }}</div>
      </div>
      <div v-for="(courseObj, cIndex) in formData.courses" :key="`user-course-${cIndex}`" class="shadow-md border-t-[1px] mb-4 p-4 relative">
        <div class="py-2 font-semibold text-center border-b-2 mb-4 cursor-pointer">Course #{{cIndex + 1}}</div>
        <button class="px-5 py-1 bg-red-500 hover:bg-red-300 text-white rounded-md absolute top-4 right-4" @click="removeCourse(cIndex)">Remove</button>
        <button class="px-5 py-1 bg-blue-500 hover:bg-blue-300 text-white rounded-md absolute top-4 right-[130px]" @click="courseObj.isHide = !courseObj.isHide">{{courseObj.isHide ? 'Show' : 'Hide'}}</button>
        <div v-if="!courseObj.isHide">
          <div class="flex items-stretch">
            <div class="w-1/2 pr-2 flex flex-col justify-between">
              <label class="font-semibold">Name</label>
              <div>
                <input v-model="courseObj.name" class="border-b-2 p-1 w-full" type="text" name="name" placeholder="Name...">
              </div>
            </div>
            <div class="w-1/2 pl-2 flex flex-col justify-between">
              <label class="font-semibold">Teacher Name</label>
              <div>
                <input v-model="courseObj.teacherName" class="border-b-2 p-1 w-full" type="text" name="teacherName" placeholder="Teacher Name...">
              </div>
            </div>
          </div>
          <div class="flex items-end mt-4">
            <div class="w-1/2 pr-2 flex flex-col justify-between pl-2">
              <label class="font-semibold">Time</label>
              <div>
                <input v-model="courseObj.time" class="border-b-2 p-1 w-full" type="text" name="time" placeholder="Time...">
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label class="font-semibold">Description</label>
            <div>
              <textarea v-model="courseObj.description" class="border-b-2 p-1 w-full" name="Description" placeholder="Description..." rows="4"></textarea>
            </div>
          </div>
          <div class="flex items-end mt-4">
            <div class="w-full flex flex-col justify-between pl-2">
              <label class="font-semibold">Students</label>
              <div>
                <v-select :selectable="e => e && !e.disabled" appendToBody v-model="courseObj.students" multiple :options="formattedUsers" :reduce="e => e._id" :closeOnSelect="false" deselectFromDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
            class="block text-green-800 text-sm font-semibold rounded-md border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs px-5 py-2 mb-4"
            @click="addCourse"
          >
            Add Course
        </button>
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
        if (!this.formData?.courses) {
          this.formData.courses = [{}]
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
    addCourse () {
      this.formData.courses.push({})
      this.formData.courses = [...this.formData.courses]
    },
    removeCourse (eIndex) {
      this.formData.courses.splice(eIndex, 1)
      this.formData.courses = [...this.formData.courses]
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