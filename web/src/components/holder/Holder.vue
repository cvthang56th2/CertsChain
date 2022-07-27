<template>
  <div>
    <div class="flex">
      <aside class="w-64" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Certs</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div class="flex-1 py-4 px-3">
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
                      src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                      alt=""
                    />
                  </div>
                  <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                    Jane Doe
                  </h1>
                  <h3 class="text-gray-600 font-lg text-semibold leading-6">
                    Owner at Her Company Inc.
                  </h3>
                  <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
                    deserunt
                  </p>
                  <ul
                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
                  >
                    <li class="flex items-center py-3">
                      <span>Status</span>
                      <span class="ml-auto"
                        ><span class="bg-green-500 py-1 px-2 rounded text-white text-sm"
                          >Active</span
                        ></span
                      >
                    </li>
                    <li class="flex items-center py-3">
                      <span>Member since</span>
                      <span class="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
                <!-- End of profile card -->
                <div class="my-4"></div>
                <!-- Friends card -->
                <div class="bg-white p-3 hover:shadow">
                  <div
                    class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
                  >
                    <span class="text-green-500">
                      <svg
                        class="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>Similar Profiles</span>
                  </div>
                  <div class="grid grid-cols-3">
                    <div class="text-center my-2">
                      <img
                        class="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt=""
                      />
                      <a href="#" class="text-main-color">Kojstantin</a>
                    </div>
                    <div class="text-center my-2">
                      <img
                        class="h-16 w-16 rounded-full mx-auto"
                        src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                        alt=""
                      />
                      <a href="#" class="text-main-color">James</a>
                    </div>
                    <div class="text-center my-2">
                      <img
                        class="h-16 w-16 rounded-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                      <a href="#" class="text-main-color">Natie</a>
                    </div>
                    <div class="text-center my-2">
                      <img
                        class="h-16 w-16 rounded-full mx-auto"
                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                        alt=""
                      />
                      <a href="#" class="text-main-color">Casey</a>
                    </div>
                  </div>
                </div>
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
                        <div class="px-4 py-2">Jane</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Last Name</div>
                        <div class="px-4 py-2">Doe</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Gender</div>
                        <div class="px-4 py-2">Female</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                        <div class="px-4 py-2">+11 998001001</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Current Address</div>
                        <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Permanant Address</div>
                        <div class="px-4 py-2">Arlington Heights, IL, Illinois</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Email.</div>
                        <div class="px-4 py-2">
                          <a class="text-blue-800" href="mailto:jane@example.com"
                            >jane@example.com</a
                          >
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Birthday</div>
                        <div class="px-4 py-2">Feb 06, 1998</div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  >
                    Show Full Information
                  </button>
                </div>
                <!-- End of about section -->

                <div class="my-4"></div>

                <!-- Experience and education -->
                <div class="bg-white p-3 shadow-sm rounded-sm">
                  <div class="grid grid-cols-2">
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
                        <li>
                          <div class="text-teal-600">Owner at Her Company Inc.</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div class="text-teal-600">Owner at Her Company Inc.</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div class="text-teal-600">Owner at Her Company Inc.</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div class="text-teal-600">Owner at Her Company Inc.</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                      </ul>
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
                        <li>
                          <div class="text-teal-600">Masters Degree in Oxford</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                        <li>
                          <div class="text-teal-600">Bachelors Degreen in LPU</div>
                          <div class="text-gray-500 text-xs">March 2020 - Now</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- End of Experience and education grid -->
                </div>
                <!-- End of profile tab -->
              </div>
            </div>
          </div>
        </div>
        <div class="h-[100px]"></div>
        <div>
          <h2 class="text-center text-2xl font-extrabold mb-4">List Certs</h2>
          <div v-for="i in [1,2,3,4,5]" :key="`cert-${i}`" class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-light text-gray-600 dark:text-gray-400">Jan 15, 2022</span> 
              <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">JavaScript</a>
            </div> 
            <div class="mt-2">
              <a href="https://stackdiary.com/" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">How to sanitiz array() in JS</a> 
              <p class="mt-2 text-gray-600 dark:text-gray-300">Dui urna vehicula tincidunt pretium consequat luctus mi, platea fermentum conubia tempus ac orci. Pellentesque dictum malesuada cubilia faucibus dignissim mi nascetur senectus, augue ad libero efficitur dolor duis lobortis, non etiam sociosqu.</p>
            </div> 
            <div class="flex items-center justify-between mt-4">
              <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Read more ⟶</a> 
              <div class="flex items-center">
                <img src="https://stackdiary.com/140x100.png" alt="Author Photo" class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"> 
                <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">John Doe</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style>

</style>