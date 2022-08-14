<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Schools</h2>
    <div class="flex">
      <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-green-400" @click="isShowPopupSchool = true">Add School</button>
      <input v-model="keyword" type="text" name="keyword" autocomplete="off" placeholder="Search..." class="ml-4 border-2 px-2 rounded-md">
    </div>
    <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
      <div class="hidden xl:flex border-b-2 py-2 font-bold">
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">Name</div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">Director Name</div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">Description</div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">Cources</div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">Created At</div>
        <div class="xl:w-1/12 whitespace-pre-wrap px-2">Status</div>
        <div class="xl:w-1/12 whitespace-pre-wrap px-2">Actions</div>
      </div>
      <div v-for="(schoolObj, sIndex) in computedSchools" :key="`school-${sIndex}`" class="xl:flex border-b-2 last:border-b-0 py-2">
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Name</b>{{ schoolObj.name }}: </div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Director Name</b>{{ schoolObj.directorName }}: </div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Description</b>{{ schoolObj.description }}: </div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Cources: </b>
          <div v-for="(courceObj, cIndex) in schoolObj.cources" :key="`school-${sIndex}-cource-${cIndex}`">
            {{ [courceObj.name, courceObj.time].filter(Boolean).join(' - ') }} 
          </div>
        </div>
        <div class="xl:w-2/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Created At: </b>{{ formatDate(schoolObj.createdAt) }}</div>
        <div class="xl:w-1/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Status: </b>
          <toggle v-model="schoolObj.status" trueValue="active" falseValue="archived" offLabel="Archived" onLabel="Active" @click="changeStatus(schoolObj._id)" />
        </div>
        <div class="mt-10 xl:mt-0 xl:w-1/12 whitespace-pre-wrap px-2">
          <b class="xl:hidden">Actions: </b>
          <button class="border-2 px-5 py-2 rounded-md cursor-pointer border-blue-400" @click="editSchool(schoolObj)">Edit</button>
        </div>
      </div>
    </div>

    <PopupSchool v-model="isShowPopupSchool" @saved="getSchools()" :schoolObj="selectedSchool" />
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>

<script>
import PopupSchool from './PopupSchool.vue'
import Axios from 'axios'
import Toggle from '@vueform/toggle'

export default {
  components: {
    PopupSchool,
    Toggle
  },
  data: () => ({
    isShowPopupSchool: false,
    schools: [],
    keyword: null,
    selectedSchool: {},
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
        resultArr.push({
          ...courceObj,
          courcesText: [courceObj.name, courceObj.time].filter(Boolean).join(' - ')
        })
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
        const { data } = await Axios.get(`${this.apiUrl}/school/list`)
        this.schools = data || []
      } catch (error) {
        this.$swal(
          'Error',
          error,
          'error'
        );
      }
    },
    async changeStatus(schoolId) {
      await Axios.post(`${this.apiUrl}/school/${schoolId}/change-status`)
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: 'Change Status Successfully!',
      })
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