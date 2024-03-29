<template>
  <DefaultLayout>
    <div v-if="(userInfo && ['Admin', 'Issuer'].includes(userInfo.userType))" class="xl:flex h-full">
      <aside class="w-full xl:w-[155px] shadow-md bg-blue-50" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 rounded">
          <ul class="space-y-2">
            <li v-for="(tabObj, tIndex) in  tabs" :key="`holder-tab-${tIndex}`" @click="currentTab = tabObj.value" class="shadow-md" :class="currentTab === tabObj.value ? 'bg-blue-200' : ''">
              <a
                class="flex items-center xl:flex-col p-5 text-base font-medium text-gray-900 rounded-md hover:bg-blue-100 cursor-pointer text-center"
              >
                <span v-html="tabObj.icon"></span>
                <span class="ml-3 xl:ml-0 xl:mt-1">{{ tabObj.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div class="flex-1 py-4 px-3">
        <component :is="currentTab" :userData="userInfo" />
      </div>
    </div>
    <div v-else class="text-center mt-20">
      User are Holder, <span class="underline text-blue-600 hover:text-blue-400 cursor-pointer" @click="goTo('/holder')">Go to Holder Page</span>
    </div>
  </DefaultLayout>
</template>

<script>
import Dashboard from './dashboard/Dashboard.vue'
import CertificateList from './certs/List.vue'
import UserList from './users/List.vue'
import SchoolList from './schools-courses/List.vue'
import CertificateRequestList from './cert-request/List.vue'
import Profile from '../../components/profile/Profile.vue'
import DefaultLayout from '../../components/layouts/Default.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Dashboard,
    Profile,
    CertificateList,
    UserList,
    SchoolList,
    CertificateRequestList,
    DefaultLayout
  },
  data: () => ({
    currentTab: 'CertificateRequestList',
    tabs: [
      {
        label: 'Certificate Requests',
        value: 'CertificateRequestList',
        icon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" width="35px" height="35px">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><path d="M663.3,865.5H10V117.1h653.3V865.5L663.3,865.5z M602.2,803.4V179.3h-531v624.1L602.2,803.4L602.2,803.4z M204.4,335.7c-16.8,0-30.6-13.7-30.6-30.6c0-16.9,13.7-30.6,30.6-30.6h275.3c16.9,0,30.6,13.7,30.6,30.6c0,16.9-13.7,30.6-30.6,30.6H204.4L204.4,335.7z M204.4,512.7c-16.8,0-30.6-13.7-30.6-30.6c0-16.9,13.7-30.6,30.6-30.6h275.3c16.9,0,30.6,13.7,30.6,30.6c0,16.9-13.7,30.6-30.6,30.6H204.4L204.4,512.7z M204.4,688.5c-16.8,0-30.6-13.7-30.6-30.6c0-16.9,13.7-30.6,30.6-30.6h275.3c16.9,0,30.6,13.7,30.6,30.6c0,16.9-13.7,30.6-30.6,30.6H204.4L204.4,688.5z M867.5,882.9L724.5,706.2V117.1H990v589.2L867.5,882.9L867.5,882.9z M863.7,780.7l65.1-93.7V178.8H785.7v505.7L863.7,780.7L863.7,780.7z M764.9,316v-61.2h183.5V316H764.9L764.9,316z"/></g>
        </svg>`
      },
      {
        label: 'Users Management',
        value: 'UserList',
        icon: `<svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="35px"
          height="35px"
          viewBox="0 0 512 512"
          enable-background="new 0 0 512 512"
          xml:space="preserve"
        >
          <text transform="matrix(1 0 0 1 168.7834 543.8093)">
            <tspan
              x="0"
              y="0"
              fill="#FFFF00"
              font-family="'Verdana-Bold'"
              font-size="20"
            >
              simpleicon.com
            </tspan>
            <tspan
              x="-159.59"
              y="24"
              fill="#FFFF00"
              font-family="'Verdana'"
              font-size="20"
            >
              Collection Of Flat Icon, Symbols And Glyph Icons
            </tspan>
          </text>
          <g>
            <path
              fill="#020201"
              d="M112.066,319.819c21.252-14.114,44.849-21.851,67.67-29.382c3.279-1.078,6.554-2.137,9.813-3.239
            l0.668-0.221c4.822-1.689,9.393-3.284,13.134-5.345c0.169-0.394,0.411-1.049,0.7-2.135c-18.788-27.428-31.554-69.82-31.554-106.136
            c0-30.807,9.682-53.629,27.941-67.526c-7.894-3.991-17.416-5.527-27.663-5.527c-27.307,0-49.442,10.91-49.442,50.082
            c0,26.007,9.755,57.906,24.296,76.43c-0.135,1.464-0.308,2.931-0.571,4.388c-0.867,3.979-2.261,8.437-5.981,10.646
            c-4.174,2.478-8.81,4.051-13.372,5.649c-18.912,6.365-38.472,11.975-55.258,23.121c-8.727,5.745-14.639,15.713-17.9,25.506
            c-3.359,10.163-4.733,24.371-4.526,32.371h51.575C104.868,324.5,108.354,322.258,112.066,319.819z"
            />
            <path
              fill="#020201"
              d="M457.457,296.129c-3.263-9.793-9.178-19.379-17.9-25.125c-16.79-11.145-36.352-16.946-55.262-23.307
            c-4.563-1.598-9.197-3.267-13.366-5.746c-3.726-2.213-5.121-6.715-5.982-10.698c-0.382-2.108-0.619-4.25-0.736-6.378
            c13.712-18.761,22.809-49.369,22.809-74.471c0-39.18-22.137-50.097-49.443-50.097c-10.385,0-20.009,1.594-27.967,5.706
            c18.105,13.913,27.697,36.684,27.697,67.366c0,35.358-11.861,76.072-29.895,103.673c0.049,0.313,0.097,0.619,0.153,0.925
            c0.475,2.141,0.864,3.259,1.106,3.814c3.955,2.205,8.687,3.935,13.973,5.794l7.919,2.639c23.412,7.773,47.621,15.722,69.428,30.19
            c3.524,2.325,6.852,4.085,9.971,8.085h52.019C462.189,320.5,460.813,306.292,457.457,296.129z"
            />
          </g>
          <path
            d="M414.744,368.006c-4.354-13.059-12.239-25.999-23.867-33.668c-22.386-14.854-48.47-22.674-73.685-31.155
          c-6.084-2.133-12.264-4.395-17.82-7.701c-4.969-2.953-6.827-8.97-7.979-14.28c-0.507-2.816-0.824-5.678-0.981-8.519
          c18.282-25.013,30.413-65.829,30.413-99.3c0-52.24-29.516-66.796-65.926-66.796c-36.408,0-65.922,14.541-65.922,66.776
          c0,34.67,13.006,77.204,32.395,101.912c-0.181,1.947-0.41,3.902-0.76,5.842c-1.159,5.303-3.018,11.249-7.975,14.194
          c-5.568,3.308-11.749,5.399-17.832,7.532c-25.215,8.489-51.297,15.965-73.677,30.827c-11.636,7.661-19.52,21.277-23.867,34.336
          c-4.48,13.551-6.311,30.494-6.035,43.494h164.772h164.773C421.053,398.5,419.219,381.556,414.744,368.006z"
          />
        </svg>`
      },
      {
        label: 'Schools and Courses',
        value: 'SchoolList',
        icon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" width="35px" height="35px">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4920,2444.9V1795l-229.2-239l-229.2-241H2310.5H159.3V505.1v-809.9h128.4h128.4v-1203v-1201l-90.9-13.8c-51.4-5.9-122.5-11.8-158-11.8c-63.2,0-67.2-4-67.2-69.1v-69.1h4901h4899l-5.9,75.1l-5.9,73.1l-152.1-7.9l-154.1-5.9v1216.9v1216.8h128.4h128.4v809.9V1315H7687.5H5536.3l-229.2,243L5078,1799v154.1v152.1h661.8h661.8V2599v493.9h-740.8H4920V2444.9z M6259.3,2604.9l4-341.7h-592.6H5078v341.7v343.7l588.7-2l586.7-2L6259.3,2604.9z M5874.1,752l859.3-888.9l-867.2-5.9c-478.1-2-1260.3-2-1742.3,0l-873.1,5.9L4120,756c478.1,491.9,875.1,890.9,883,888.9C5010.9,1642.9,5402,1241.9,5874.1,752z M4157.5,1014.7c-84.9-90.9-375.3-389.2-642-661.8l-486-499.8h-1365h-1367v647.9c0,357.5,5.9,655.8,13.8,661.8c5.9,7.9,910.7,13.8,2007,13.8h1995.2L4157.5,1014.7z M9696.5,511l4-657.8l-1376.9,2l-1378.8,2l-523.5,541.3c-288.4,298.3-570.9,596.6-628.2,659.8l-106.7,118.5l2003.1-4l2001.1-5.9L9696.5,511z M2984.1-1509.8v-1205H1769.2H554.3v1205v1205h1214.9h1214.9V-1509.8z M6855.9-1509.8v-1205h-659.8h-661.8l-5.9,726.9c-5.9,807.9-3.9,796.1-146.2,952.1c-116.6,128.4-207.4,167.9-393.1,167.9c-124.4,0-175.8-9.9-237.1-43.5c-106.7-57.3-197.5-154.1-246.9-270.6c-41.5-90.9-43.5-124.4-45.4-813.9v-719.1h-659.8h-657.8v1205v1205H4999h1856.9V-1509.8z M9423.9-1509.8v-1205H8209.1H6994.2v1205v1205h1214.9h1214.9V-1509.8z M5178.8-1059.5c41.5-23.7,100.8-77,130.4-120.5l55.3-79l5.9-728.9l5.9-726.9h-387.2h-385.2v691.4c0,580.8,5.9,705.2,29.6,766.4c37.5,84.9,94.8,152.1,177.8,203.5C4896.3-1000.2,5078-1002.1,5178.8-1059.5z"/><path d="M4771.8,1079.9c-110.6-49.4-199.5-130.4-262.7-237c-47.4-81-53.3-110.6-53.3-268.7c0-158,5.9-187.7,53.3-268.7c108.6-183.7,264.7-272.6,480-274.6c104.7,0,162,11.9,237.1,47.4c416.8,197.5,416.8,794.1,0,991.7C5099.8,1129.3,4890.4,1135.2,4771.8,1079.9z M5103.7,957.5c156.1-43.5,290.4-219.3,290.4-383.2c0-235.1-231.1-430.6-464.2-397.1c-227.2,35.6-387.2,276.6-325.9,493.9c45.4,165.9,215.3,304.2,375.3,308.2C5006.9,979.2,5062.2,969.3,5103.7,957.5z"/><path d="M4916,777.7l-5.9-124.4l-112.6-5.9l-114.6-5.9v-67.2v-69.1h187.7h187.7v197.5v197.5h-69.1H4922L4916,777.7z"/><path d="M811.1-927.1v-405h405h405v405v405h-405h-405V-927.1z M1463-927.1V-1174h-246.9H969.2v246.9v246.9h246.9H1463V-927.1z"/><path d="M1931.2-536c-7.9-5.9-13.8-189.6-13.8-405v-391.1h405h405v405v405h-391.1C2120.8-522.1,1937.1-528.1,1931.2-536z M2585.1-927.1l2-246.9h-256.8h-254.8v246.9v246.9h252.8h254.8L2585.1-927.1z"/><path d="M811.1-2092.6v-405h405h405v405v405h-405h-405V-2092.6z M1463-2102.5v-256.8l-246.9,3.9l-246.9,4v252.8v252.9h246.9H1463V-2102.5z"/><path d="M1931.2-1701.5c-7.9-5.9-13.8-189.6-13.8-405v-391.1h405h405v405v405h-391.1C2120.8-1687.6,1937.1-1693.5,1931.2-1701.5z M2579.1-2102.5v-246.9h-246.9h-246.9l-5.9,252.8l-5.9,252.9l252.9-5.9l252.9-5.9V-2102.5z"/><path d="M3418.7-927.1v-405h395.1h395.1v405v405h-395.1h-395.1V-927.1z M4070.6-927.1V-1174h-256.8H3557v246.9v246.9h256.8h256.8V-927.1z"/><path d="M5769.4-927.1v-405h405h405l-4,401l-5.9,399l-399,5.9l-401,4V-927.1z M6421.3-927.1V-1174h-256.8h-256.8v246.9v246.9h256.8h256.8V-927.1z"/><path d="M3418.7-2092.6v-405h395.1h395.1v405v405h-395.1h-395.1V-2092.6z M4066.6-2096.5l-5.9-252.8h-246.9h-246.9l-5.9,252.8l-5.9,250.9h258.8h258.8L4066.6-2096.5z"/><path d="M5769.4-2092.6v-405h405h405l-4,401l-5.9,399l-399,5.9l-401,4V-2092.6z M6417.4-2096.5l-5.9-252.8h-246.9h-246.9l-5.9,252.8l-5.9,250.9h258.8h258.8L6417.4-2096.5z"/><path d="M7251-927.1v-405h405h405v405v405h-405h-405V-927.1z M7902.9-927.1V-1174h-246.9H7409v246.9v246.9h246.9h246.9V-927.1z"/><path d="M8371-536c-7.9-5.9-13.8-189.6-13.8-405v-391.1h405h405v405v405H8776C8560.7-522.1,8377-528.1,8371-536z M9028.8-927.1V-1174H8772h-256.8v246.9v246.9H8772h256.8V-927.1z"/><path d="M7251-2092.6v-405h405h405v405v405h-405h-405V-2092.6z M7902.9-2102.5v-256.8h-246.9H7409v256.8v256.8h246.9h246.9V-2102.5z"/><path d="M8371-1701.5c-7.9-5.9-13.8-189.6-13.8-405v-391.1h405h405v405v405H8776C8560.7-1687.6,8377-1693.5,8371-1701.5z M9024.9-2096.5l-5.9-252.8H8772h-246.9l-5.9,252.8l-5.9,250.9H8772h258.8L9024.9-2096.5z"/></g></g>
        </svg>`
      },
      {
        label: 'Certificates Management',
        value: 'CertificateList',
        icon: `<svg
          width="35px"
          height="35px"
          class="flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
          fill="currentColor"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1000 1000"
          enable-background="new 0 0 1000 1000"
          xml:space="preserve"
        >
          <metadata>
            Svg Vector Icons : http://www.onlinewebfonts.com/icon
          </metadata>
          <g>
            <g
              transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"
            >
              <path
                d="M433.5,4175.4c-142.1-70-214.1-146.2-284.1-296.5L100,3776V801v-2975l49.4-102.9c70-150.3,142.1-226.5,284.1-296.5l125.6-63.8h1383.5h1383.5l41.2,144.1l43.2,144.1l-844.1,4.1l-844.1,6.2l-55.6,179.1c-102.9,317-280,580.6-522.9,780.3c-152.4,123.5-450.9,273.8-621.8,312.9l-123.5,28.8V811.3v1846.8l135.9,37.1c543.5,140,971.8,553.8,1140.6,1101.5l45.3,144.1h3298.2h3298.2l61.8-185.3c86.5-259.4,201.8-444.7,397.4-640.3c195.6-193.5,387.1-312.9,642.3-397.3l183.3-61.8V811.3v-1844.7l-183.3-61.8c-201.8-68-317-127.6-485.9-257.4c-273.8-205.9-483.8-522.9-578.5-862.7l-32.9-123.5l-912.1-6.2c-714.4-4.1-907.9-10.3-899.7-30.9c4.1-12.4,26.8-78.2,47.4-142.1l37.1-119.4h1422.6h1424.7l125.6,63.8c142.1,70,214.1,146.2,284.1,296.5L9900-2174V801v2975l-49.4,102.9c-70,150.3-142,226.5-284.1,296.5l-125.6,63.8H5000H559.1L433.5,4175.4z"
              />
              <path
                d="M2405.9,2818.7v-144.1h2604.4h2604.4v144.1v144.1H5010.3H2405.9V2818.7z"
              />
              <path
                d="M2405.9,1892.2v-144.1h2604.4h2604.4v144.1v144.1H5010.3H2405.9V1892.2z"
              />
              <path
                d="M4633.5,1087.2c-86.5-156.5-109.1-183.2-160.6-195.6c-30.9-8.2-82.4-4.1-115.3,8.2c-197.6,82.4-181.2,80.3-224.4,26.8c-20.6-26.8-39.1-80.3-39.1-119.4c0-154.4-67.9-212.1-242.9-207.9c-152.4,4.1-177.1-16.5-156.5-137.9c37.1-220.3,6.2-277.9-168.8-329.4c-152.3-43.2-164.7-102.9-47.3-255.3c76.2-96.7,39.1-207.9-94.7-290.3c-102.9-63.8-100.9-144.1,8.2-222.3c140-96.8,156.5-179.1,63.8-315c-32.9-49.4-61.8-107.1-61.8-125.6c0-37.1,74.1-98.8,119.4-98.8c57.7,0,164.7-65.9,187.4-115.3c18.5-41.2,18.5-82.4-2.1-172.9c-32.9-164.7-12.3-187.3,162.7-181.2c123.5,6.2,135.9,2.1,183.2-51.5c35-41.2,49.4-82.3,49.4-140c0-45.3,10.3-100.9,20.6-123.5c26.8-47.4,111.2-51.5,185.3-8.2c28.8,16.5,84.4,28.8,127.7,30.9c82.4,0,150.3-61.8,199.7-181.2c45.3-107.1,125.6-102.9,236.8,14.4c84.4,88.5,191.5,88.5,273.8,0c113.2-121.5,207.9-119.4,251.2,6.2c51.5,148.2,183.2,203.8,310.9,129.7c74.1-43.2,158.5-39.1,185.3,8.2c10.3,22.6,20.6,74.1,20.6,115.3c0,148.2,88.5,220.3,253.2,201.8c133.8-16.5,166.8,14.4,148.2,137.9c-24.7,156.5-18.5,205.9,30.9,257.4c24.7,26.8,76.2,55.6,111.2,61.8c88.5,18.5,156.5,65.9,156.5,109.1c0,18.5-28.8,76.2-61.8,125.6c-88.5,131.7-82.4,172.9,51.5,300.6c61.8,59.7,113.2,121.5,113.2,133.8s-24.7,43.2-53.5,67.9C6457.6-286,6441.2-230.4,6546.2-88.4c90.6,123.5,74.1,179.1-72.1,220.3c-177.1,51.5-201.8,98.8-166.8,331.5c18.5,129.7,4.1,142.1-166.8,135.9c-119.4-4.1-129.7-2.1-181.2,57.6c-37.1,45.3-53.5,88.5-53.5,144.1c0,45.3-16.5,96.8-39.1,125.6c-43.2,53.5-24.7,55.6-228.5-26.8c-96.8-39.1-164.7-4.1-236.8,127.7c-82.3,148.2-125.6,154.4-247.1,43.2c-121.5-113.2-187.4-113.2-306.8-2.1C4738.5,1169.5,4680.9,1173.7,4633.5,1087.2z M5339.7,510.7c253.2-78.2,490-277.9,623.8-527.1c282.1-531.2,63.8-1212.6-475.6-1474.1c-201.8-98.8-333.5-125.6-547.7-113.2c-399.4,24.7-728.8,240.9-905.9,597.1C3785.3-512.5,3939.7,76.3,4394.7,381C4680.9,568.4,5006.2,613.7,5339.7,510.7z"
              />
              <path
                d="M4860,90.7c-70-142.1-133.8-257.4-142.1-257.4c-10.3,0-131.8-18.5-273.8-41.2c-142.1-22.6-265.6-41.2-277.9-41.2c-10.3,0,76.2-96.8,193.5-214.1l212.1-214.1l-49.4-290.3l-51.5-290.3l265.6,137.9l267.6,137.9l267.6-142.1c205.9-107.1,265.6-129.7,255.3-100.9c-6.2,22.7-30.9,154.4-53.5,294.4l-43.2,257.4l210,210l210,212.1l-70,10.3c-39.1,8.2-166.8,26.8-284.1,43.2c-117.3,18.5-218.2,35-226.5,39.1c-6.2,4.1-67.9,121.5-135.9,257.3c-65.9,137.9-127.7,249.1-133.8,249.1S4932.1,232.8,4860,90.7z"
              />
              <path
                d="M3902.7-1854.9c-18.5-45.3-590.9-1861.2-590.9-1877.6c0-8.2,135.9,57.6,300.6,142.1c238.8,123.5,304.7,150.3,319.1,127.6c10.3-16.5,84.4-152.4,166.8-302.6c90.6-164.7,154.4-261.5,162.6-247.1c18.5,35,512.6,1597.6,512.6,1622.3c0,12.3-30.9,20.6-65.9,20.6c-98.8,0-189.4,65.9-240.9,172.9l-47.4,94.7l-78.2-41.2c-195.6-100.9-382.9,2.1-411.8,226.5C3921.2-1863.1,3910.9-1836.3,3902.7-1854.9z"
              />
              <path
                d="M6025.3-2062.8c-37.1-63.8-146.2-121.5-226.5-121.5c-26.8,0-86.5,18.5-133.8,39.1l-86.5,41.2l-45.3-94.7c-24.7-51.5-74.1-109.1-109.1-131.7c-70-43.3-197.6-51.5-261.5-18.5c-20.6,12.3-39.1,16.5-39.1,10.3c0-10.3,504.4-1616.2,527.1-1677.9c6.2-18.5,70,61.8,177.1,226.5c90.6,142.1,166.8,259.4,168.8,261.5c2.1,2.1,137.9-45.3,300.6-105c164.7-61.8,300.6-109.1,304.7-105c2.1,2.1-115.3,389.1-263.5,856.5c-148.2,469.4-271.8,858.5-273.8,866.8C6062.3-2007.2,6043.8-2027.8,6025.3-2062.8z"
              />
            </g>
          </g>
        </svg>`
      },
      {
        label: 'Profile',
        value: 'Profile',
        icon: `<svg
          aria-hidden="true"
          width="35px"
          height="35px"
          class="flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>`
      },
    ]
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo'
    })
  },
  watch: {
    currentTab () {
      this.$router.push({ path: this.$route.path, query: { tab: this.currentTab }})
    }
  },
  mounted() {
    const _this = this
    const { tab } = _this.$route.query
    if (tab && _this.tabs.some(e => e.value === tab)) {
      _this.currentTab = tab
    }
  }
}
</script>

<style>

</style>