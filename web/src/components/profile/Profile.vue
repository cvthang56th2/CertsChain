<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">Profile</h2>
    <div class="container mx-auto my-5 p-5">
      <div class="md:flex no-wrap md:-mx-2">
        <!-- Left Side -->
        <div class="w-full md:w-3/12 md:mx-2">
          <!-- Profile Card -->
          <div class="bg-white p-3 border-t-4 border-green-400">
            <div class="image overflow-hidden">
              <img
                class="h-auto w-full mx-auto"
                :src="avatarUrl(user)"
                alt=""
              />
              <div class="mt-2 text-center">
                <button @click="$refs.avatarFile.click()" class="border-2 px-3 py-1 rounded-md">Change Avatar</button>
                <input ref="avatarFile" type="file" class="hidden">
              </div>
            </div>
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
              {{ [user.firstName, user.lastName].filter(Boolean).join(' ') }}
            </h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6 text-center">
              {{ user.experiences[user.experiences.length - 1].title }}
            </h3>
            <textarea v-if="isEditting" v-model="formData.description" placeholder="Description" class="text-sm text-gray-500 hover:text-gray-600 leading-6 w-full border-b-2" rows="4"></textarea>
            <p v-else class="text-sm text-gray-500 hover:text-gray-600 leading-6 min-h-[40px]">
              {{ user.description }}
            </p>
            <ul
              class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
            >
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto"
                  ><span class="bg-green-500 py-1 px-2 rounded text-white text-sm capitalize"
                    >{{ user.status }}</span
                  ></span
                >
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">{{ formatDate(user.createdAt, { format: 'DD/MM/YYYY' }) }}</span>
              </li>
            </ul>
          </div>
          <!-- End of profile card -->
          <div class="my-4"></div>
          <!-- End of friends card -->
        </div>
        <!-- Right Side -->
        <div class="w-full md:w-9/12 mx-2 h-64">
          <!-- Profile tab -->
          <!-- About Section -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div
              class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
            >
              <span clas="text-green-500">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="tracking-wide">About</span>
            </div>
            <div class="text-gray-700">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">First Name</div>
                  <input v-if="isEditting" v-model="formData.firstName" class="px-4 py-2 border-b-2" type="text" placeholder="First Name">
                  <div v-else class="px-4 py-2">{{ user.firstName }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Last Name</div>
                  <input v-if="isEditting" v-model="formData.lastName" class="px-4 py-2 border-b-2" type="text" placeholder="Last Name">
                  <div v-else class="px-4 py-2">{{ user.lastName }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Gender</div>
                  <div v-if="isEditting" class="flex items-center px-4">
                    <div class="cursor-pointer" @click="$refs.genderMale.click()">
                      <input ref="genderMale" type="radio" class="mr-2" v-model="formData.gender" value="male" /> Male
                    </div>
                    <div class="cursor-pointer ml-5" @click="$refs.genderFemale.click()">
                      <input ref="genderFemale" type="radio" class="mr-2" v-model="formData.gender" value="female" /> Female
                    </div>
                  </div>
                  <div v-else class="px-4 py-2 capitalize">{{ user.gender }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Contact No.</div>
                  <input v-if="isEditting" v-model="formData.contactNo" class="px-4 py-2 border-b-2" type="text" placeholder="Contact No.">
                  <div v-else class="px-4 py-2">+{{ user.contactNo }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Current Address</div>
                  <input v-if="isEditting" v-model="formData.currentAddress" class="px-4 py-2 border-b-2" type="text" placeholder="Current Address">
                  <div v-else class="px-4 py-2">{{ user.currentAddress }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Permanant Address</div>
                  <input v-if="isEditting" v-model="formData.permanantAddress" class="px-4 py-2 border-b-2" type="text" placeholder="Permanant Address">
                  <div v-else class="px-4 py-2">{{ user.permanantAddress }}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Email.</div>
                  <input v-if="isEditting" v-model="formData.email" class="px-4 py-2 border-b-2" type="email" placeholder="Email.">
                  <div v-else class="px-4 py-2">
                    <a class="text-blue-800" :href="`mailto:${user.email}`"
                      >{{ user.email }}</a
                    >
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="px-4 py-2 font-semibold">Birthday</div>
                  <input v-if="isEditting" v-model="formData.birthday" class="px-4 py-2 border-b-2" type="date" placeholder="Birthday">
                  <div v-else class="px-4 py-2">{{ user.birthday }}</div>
                </div>
              </div>
            </div>
            <template v-if="editable">
              <div v-if="isEditting" class="flex">
                <button
                  class="mr-2 block w-full text-red-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  @click="isEditting = false"
                >
                  Cancel
                </button>
                <button
                  class="ml-2 block w-full text-green-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  @click="saveUser"
                >
                  Save
                </button>
              </div>
              <button
                v-else
                class="block w-full text-blue-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                @click="editUser"
              >
                Edit
              </button>
            </template>
          </div>
          <!-- End of about section -->

          <div class="my-4"></div>

          <!-- Experience and education -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
            <div class="grid grid-cols-2 gap-x-10">
              <div>
                <div
                  class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                >
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">Experience</span>
                </div>
                <ul class="list-inside space-y-2">
                  <li v-for="(expObj, eIndex) in (isEditting ? formData.experiences : user.experiences)" :key="`user-exp-${eIndex}`">
                    <div class="flex justify-between">
                      <div class="flex-1 pr-10">
                        <input v-if="isEditting" type="text" v-model="formData.experiences[eIndex].title" class="text-teal-600 border-b-2 block w-full" placeholder="Title">
                        <div v-else class="text-teal-600">{{ expObj.title }}</div>
                        <input v-if="isEditting" type="text" v-model="formData.experiences[eIndex].time" class="text-gray-500 text-xs border-b-2 block w-full" placeholder="Time">
                        <div v-else class="text-gray-500 text-xs">{{ expObj.time }}</div>
                      </div>
                      <button v-if="isEditting" @click="removeExp(eIndex)">Remove</button>
                    </div>
                  </li>
                </ul>
                <button
                  v-if="isEditting"
                  class="block w-full text-green-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  @click="addExp"
                >
                  Add
                </button>
              </div>
              <div>
                <div
                  class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                >
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">Education</span>
                </div>
                <ul class="list-inside space-y-2">
                  <li v-for="(educationObj, eIndex) in (isEditting ? formData.educations : user.educations)" :key="`user-education-${eIndex}`">
                    <div class="flex justify-between">
                      <div class="flex-1 pr-10">
                        <input v-if="isEditting" type="text" v-model="formData.educations[eIndex].title" class="text-teal-600 border-b-2 block w-full" placeholder="Title">
                        <div v-else class="text-teal-600">{{ educationObj.title }}</div>
                        <input v-if="isEditting" type="text" v-model="formData.educations[eIndex].time" class="text-gray-500 text-xs border-b-2 block w-full" placeholder="Time">
                        <div v-else class="text-gray-500 text-xs">{{ educationObj.time }}</div>
                      </div>
                      <button v-if="isEditting" @click="removeEducation(eIndex)">Remove</button>
                    </div>
                  </li>
                </ul>
                <button
                  v-if="isEditting"
                  class="block w-full text-green-800 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  @click="addEducation"
                >
                  Add
                </button>
              </div>
            </div>
            <!-- End of Experience and education grid -->
          </div>
          <!-- End of profile tab -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { USER_INFO_KEY } from '../../constants'

export default {
  props: {
    userData: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    user: {
      experiences: [{}],
      educations: [{}]
    },
    formData: {},
    isEditting: false
  }),
  watch: {
    userData: {
      immediate: true,
      handler () {
        const cloneUser = JSON.parse(JSON.stringify(this.userData))
        if (!cloneUser.experiences.length) {
          cloneUser.experiences = [{}]
        }
        if (!cloneUser.educations.length) {
          cloneUser.educations = [{}]
        }
        this.user = cloneUser
      }
    }
  },
  methods: {
    editUser () {
      this.formData = JSON.parse(JSON.stringify(this.user))
      this.isEditting = true
    },
    async saveUser () {
      try {
        const { data } = await Axios.post(`${this.apiUrl}/user/update`, this.formData)
        if (data.success) {
          this.user = JSON.parse(JSON.stringify(this.formData))
          this.$cookies.set(USER_INFO_KEY, JSON.parse(JSON.stringify(this.formData)))
          this.isEditting = false
        } else {
          alert('Update Failed')
        }
      } catch (error) {
        alert(error)
      }
    },
    addExp () {
      this.formData.experiences.push({})
      this.formData.experiences = [...this.formData.experiences]
    },
    removeExp (eIndex) {
      this.formData.experiences.splice(eIndex, 1)
      this.formData.experiences = [...this.formData.experiences]
    },
    addEducation () {
      this.formData.educations.push({})
      this.formData.educations = [...this.formData.educations]
    },
    removeEducation (eIndex) {
      this.formData.educations.splice(eIndex, 1)
      this.formData.educations = [...this.formData.educations]
    }
  }
}
</script>

<style>

</style>