<template>
  <div>
    <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
    <div class="flex flex-wrap">
      <div v-for="(certObj, cIndex) in computedCerts" :key="`cert-${cIndex}`" class="p-4 w-1/3">
        <div class="px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
          <div class="flex items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ formatDate(certObj.createdAt, { format: 'DD/MM/YYYY' }) }}</span> 
            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-green-600 rounded">Success</a>
          </div> 
          <div class="mt-2">
            <h4 class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
            {{ certObj.schoolId?.name }}
            </h4>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              {{ certObj.schoolId?.description }}
            </p>
            <h4 class="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
              {{ certObj.courceText }}
            </h4>
            <div class="flex items-center mt-4">
              Teacher: <span class="ml-2 font-bold text-gray-700 dark:text-gray-200">{{ certObj.courceObj?.teacherName }}</span>
            </div>
          </div> 
          <div class="flex items-center justify-between mt-4">
            <a :href="certObj.certSrc" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">View more ⟶</a> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    certs: [],
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
    }),
    computedCerts () {
      let result = JSON.parse(JSON.stringify(this.certs)).map(certObj => {
        const courceObj = (certObj.schoolId?.cources || []).find(e => e._id === certObj.courceId) || {}
        return {
          ...certObj,
          courceObj,
          courceText: [courceObj.name, courceObj.time].filter(Boolean).join(' - '),
        }
      })
      return result
    },
  },
  mounted () {
    this.getCerts()
  },
  methods: {
    async getCerts() {
      try {
        const { data } = await Axios.get(`${this.apiUrl}/certificate/list?userId=${this.userInfo._id}`)
        this.certs = data || []
      } catch (error) {
        console.log('error', error)        
      }
    },
  }
}
</script>

<style>

</style>