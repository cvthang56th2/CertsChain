<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Schools</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupSchool = true">Add School</button>
      <input v-model="keyword" type="text" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="flex border-b-2 my-4">
      <div v-for="tab in ['active', 'archived']" :key="`tab-${tab}`" class="p-2 cursor-pointer text-center capitalize" :class="currentTab === tab ? 'font-bold border-b-2 border-b-cyan-400' : ''" @click="currentTab = tab">{{ tab }}</div>
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="flex border-b-2 py-2 font-bold">
        <div class="w-1/6 px-2 text-center">Name</div>
        <div class="w-1/6 px-2 text-center">Description</div>
        <div class="w-1/6 px-2 text-center">Cources</div>
        <div class="w-1/6 px-2 text-center">Created At</div>
        <div class="w-1/6 px-2 text-center">Status</div>
        <div class="w-1/6 px-2 text-center">Actions</div>
      </div>
      <div v-for="(schoolObj, sIndex) in computedSchools" :key="`school-${sIndex}`" class="flex border-b-2 last:border-b-0 py-2">
        <div class="w-1/6 px-2">{{ schoolObj.name }}</div>
        <div class="w-1/6 px-2">{{ schoolObj.description }}</div>
        <div class="w-1/6 px-2">
          <div v-for="(courceObj, cIndex) in schoolObj.cources" :key="`school-${sIndex}-cource-${cIndex}`">
            {{ [courceObj.name, courceObj.time].filter(Boolean).join(' - ') }} 
          </div>
        </div>
        <div class="w-1/6 px-2">{{ schoolObj.createdAt }}</div>
        <div class="w-1/6 px-2 capitalize text-center cursor-pointer" @click="changeStatus(schoolObj._id)">{{ schoolObj.status }}</div>
        <div class="w-1/6 px-2">
          <div class="flex justify-center">
            <div>
              <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-400" @click="editSchool(schoolObj)">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PopupSchool v-model="isShowPopupSchool" @saved="getSchools()" :schoolObj="selectedSchool" />
  </div>
</template>

<script>
import PopupSchool from './PopupSchool.vue'
import Axios from 'axios'

export default {
  components: {
    PopupSchool
  },
  data: () => ({
    isShowPopupSchool: false,
    schools: [],
    keyword: null,
    selectedSchool: {},
    currentTab: 'active'
  }),
  watch: {
    isShowPopupSchool (v) {
      if (!v) {
        this.selectedSchool = {}
      }
    }
  },
  computed: {
    computedSchools () {
      let result = JSON.parse(JSON.stringify(this.schools)).reduce((resultArr, courceObj) => {
        if (courceObj.status === this.currentTab) {
          resultArr.push({
            ...courceObj,
            courcesText: [courceObj.name, courceObj.time].filter(Boolean).join(' - ')
          })
        }
        return resultArr
      }, [])
      if (this.keyword) {
        let reg = new RegExp(this.keyword, 'gi')
        result = result.filter(courceObj => (
          (courceObj.name && courceObj.name.match(reg)) ||
          (courceObj.courcesText && courceObj.courcesText.match(reg)) ||
          (courceObj.description && courceObj.description.match(reg))
        ))
      }
      return result
    },
  },
  mounted () {
    this.getSchools()
  },
  methods: {
    async getSchools() {
      try {
        const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/school/list`)
        this.schools = data || []
      } catch (error) {
        console.log('error', error)        
      }
    },
    async changeStatus(schoolId) {
      await Axios.post(`${import.meta.env.VITE_API_URL}/school/${schoolId}/change-status`)
      this.getSchools()
    },
    editSchool(schoolObj) {
      this.selectedSchool = schoolObj
      this.isShowPopupSchool = true
    }
  }
}
</script>

<style>

</style>