<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Title -->
   <div>
    <PageTitle :title="breadcrumbTitle" class="px-6" />
   </div>



   <div class="flex flex-wrap items-center gap-2 px-6 mb-3 md:justify-between create_grn_header_wrapper mt-[16px]" >
            <a @click="$router.back()" href="#" class="flex items-center p-1 rounded hover:bg-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.0047 10.9951L13.5977 6.40205C13.6893 6.3086 13.7985 6.23422 13.919 6.18324C14.0395 6.13225 14.1689 6.10565 14.2998 6.10499C14.4306 6.10433 14.5603 6.12962 14.6813 6.17939C14.8023 6.22915 14.9123 6.30242 15.0048 6.39494C15.0973 6.48747 15.1706 6.59742 15.2204 6.71844C15.2701 6.83945 15.2954 6.96913 15.2948 7.09998C15.2941 7.23083 15.2675 7.36025 15.2165 7.48076C15.1655 7.60126 15.0912 7.71047 14.9977 7.80205L11.0977 11.7021L14.9977 15.6021C15.1803 15.7883 15.2819 16.0392 15.2806 16.3C15.2793 16.5608 15.1751 16.8106 14.9907 16.995C14.8062 17.1795 14.5565 17.2837 14.2956 17.285C14.0348 17.2863 13.784 17.1846 13.5977 17.0021L9.0047 12.4101C8.81723 12.2225 8.71191 11.9682 8.71191 11.7031C8.71191 11.4379 8.81723 11.1836 9.0047 10.9961V10.9951Z"
                        fill="#44546F" />
                </svg>
                <span class="text-xs">Back</span>
            </a>

            <div class="flex items-center gap-2">
                <h3>View Changes</h3>
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_9016_22092)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.1189 1.35178C5.33555 1.28225 5.56706 1.27318 5.78849 1.32553L5.88224 1.35178L8.60474 2.22511C8.6839 2.25136 8.75515 2.30053 8.80724 2.36928L8.8364 2.41303L9.98224 4.39095C10.0112 4.44091 10.0295 4.49635 10.0359 4.55375C10.0423 4.61116 10.0367 4.66927 10.0195 4.72439C10.0023 4.77952 9.97375 4.83046 9.93577 4.87398C9.8978 4.9175 9.85119 4.95265 9.7989 4.9772L9.7489 4.99678L8.89432 5.27095V7.07511C8.89426 7.24006 8.84525 7.40128 8.7535 7.53835C8.66174 7.67543 8.53138 7.78219 8.3789 7.84511L8.31557 7.86845L5.88224 8.64845C5.66559 8.71797 5.43408 8.72705 5.21265 8.6747L5.1189 8.64886L2.68557 7.86845C2.52847 7.818 2.38989 7.72205 2.28737 7.59276C2.18486 7.46347 2.12304 7.30666 2.10974 7.1422L2.10682 7.0747V5.27095L1.25224 4.99678C1.19728 4.97914 1.14658 4.95028 1.10337 4.91202C1.06015 4.87376 1.02535 4.82694 1.00118 4.77453C0.977013 4.72211 0.963996 4.66525 0.962958 4.60754C0.96192 4.54983 0.972883 4.49253 0.995153 4.43928L1.0189 4.39095L2.16474 2.41303C2.20769 2.33893 2.27243 2.27986 2.35015 2.24387L2.39599 2.22511L5.1189 1.35178ZM5.91724 5.1272V7.7622L8.06099 7.0747V5.53845L6.77349 5.95136C6.69092 5.97785 6.60215 5.97791 6.51954 5.95155C6.43693 5.92518 6.36461 5.8737 6.31265 5.80428L6.28599 5.76345L5.91724 5.1272ZM5.0839 5.1272L4.71515 5.76345C4.6675 5.84567 4.59318 5.90913 4.50452 5.94331C4.41585 5.97749 4.31816 5.98033 4.22765 5.95136L2.94015 5.53845V7.0747L5.0839 7.76261V5.1272ZM2.71724 3.12095L1.99932 4.36136L4.16224 5.05553L4.88099 3.81511L2.71724 3.12095ZM8.2839 3.12095L6.12015 3.81511L6.83849 5.05553L9.00182 4.36136L8.2839 3.12095ZM5.62765 2.14511C5.56169 2.12405 5.49152 2.11975 5.42349 2.13261L5.37349 2.14511L3.88807 2.62178L5.50057 3.13886L7.11307 2.62178L5.62765 2.14511Z"
                            fill="#626F86" />
                    </g>
                    <defs>
                        <clipPath id="clip0_9016_22092">
                            <rect width="10" height="10" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                <span class="font-light upper">{{ productName }}</span>
            </div>

            <div></div>
        </div>

  

    <!-- Summary Cards -->
    <div class="px-6 py-2">
      <div class="w-full lg:w-1/3">
        <div class="bg-gray-100 rounded-lg p-4">
          <div class="flex">
            <!-- Left Section: Last Updated -->
            <div class="flex-1 pr-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Last Updated</h4>
              <div class="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99967 3.33337C6.32301 3.33337 3.33301 6.32337 3.33301 10C3.33301 13.6767 6.32301 16.6667 9.99967 16.6667C13.6763 16.6667 16.6663 13.6767 16.6663 10C16.6663 6.32337 13.6763 3.33337 9.99967 3.33337ZM9.99967 15.185C8.62507 15.1833 7.30727 14.6364 6.33527 13.6644C5.36328 12.6924 4.81644 11.3746 4.81467 10C4.81644 8.62543 5.36328 7.30763 6.33527 6.33564C7.30727 5.36365 8.62507 4.8168 9.99967 4.81504C11.3743 4.8168 12.6921 5.36365 13.6641 6.33564C14.6361 7.30763 15.1829 8.62543 15.1847 10C15.1829 11.3746 14.6361 12.6924 13.6641 13.6644C12.6921 14.6364 11.3743 15.1833 9.99967 15.185ZM10.7405 9.69337V7.04004C10.7405 6.63254 10.4072 6.29921 9.99967 6.29921C9.59217 6.29921 9.25884 6.63254 9.25884 7.04087V10.0034C9.25884 10.21 9.34467 10.3959 9.48217 10.5309L11.3113 12.3592C11.4505 12.4977 11.6388 12.5754 11.8351 12.5754C12.0314 12.5754 12.2197 12.4977 12.3588 12.3592C12.4971 12.2201 12.5746 12.032 12.5746 11.8359C12.5746 11.6398 12.4971 11.4516 12.3588 11.3125L10.7405 9.69337Z" fill="#091E42" fill-opacity="0.31"/>
                </svg>
                <p class="text-sm text-[#44546F]">15/01/2025 01:41:31PM</p>
              </div>
            </div>
            
            <!-- Vertical Separator -->
            <div class="w-px bg-gray-300 mx-4"></div>
            
            <!-- Right Section: Batch Quantity -->
            <div class="flex-1 pl-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Batch Quantity</h4>
              <div class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.78109 0.803253C8.11755 0.77264 8.45672 0.810541 8.77813 0.914668C9.09953 1.0188 9.3965 1.18699 9.65109 1.40909L9.77608 1.52575L16.2944 8.04492C16.743 8.49361 17.0042 9.09607 17.0251 9.7302C17.046 10.3643 16.825 10.9827 16.4069 11.4599L16.2944 11.5799L11.5803 16.2941C11.1316 16.7427 10.5291 17.0039 9.89497 17.0248C9.26084 17.0457 8.64249 16.8247 8.16525 16.4066L8.04525 16.2941L1.52525 9.77492C1.28648 9.53616 1.09855 9.25151 0.972802 8.93814C0.847052 8.62477 0.786087 8.28917 0.793585 7.95159L0.802752 7.78075L1.19609 3.45992C1.24658 2.90307 1.48229 2.37923 1.86555 1.97211C2.2488 1.56499 2.75747 1.29809 3.31025 1.21409L3.45942 1.19659L7.78109 0.803253ZM8.03775 2.46075L7.93192 2.46325L3.61109 2.85659C3.43389 2.87259 3.26646 2.94488 3.1333 3.06289C3.00015 3.1809 2.90826 3.33843 2.87109 3.51242L2.85692 3.61075L2.46359 7.93159C2.44465 8.14155 2.50599 8.35089 2.63525 8.51742L2.70442 8.59659L9.22359 15.1158C9.36708 15.2592 9.558 15.3454 9.76052 15.3582C9.96304 15.3709 10.1632 15.3093 10.3236 15.1849L10.4019 15.1158L15.1161 10.4016C15.2596 10.2581 15.3458 10.0672 15.3585 9.86466C15.3712 9.66213 15.3096 9.46192 15.1853 9.30159L15.1161 9.22325L8.59692 2.70409C8.44797 2.55524 8.24819 2.4683 8.03775 2.46075ZM5.09775 5.09825C5.32992 4.86609 5.60554 4.68192 5.90888 4.55628C6.21222 4.43063 6.53734 4.36596 6.86567 4.36596C7.194 4.36596 7.51912 4.43063 7.82246 4.55628C8.1258 4.68192 8.40142 4.86609 8.63359 5.09825C8.86575 5.33042 9.04992 5.60604 9.17556 5.90938C9.30121 6.21272 9.36588 6.53784 9.36588 6.86617C9.36588 7.1945 9.30121 7.51962 9.17556 7.82296C9.04992 8.1263 8.86575 8.40192 8.63359 8.63409C8.16471 9.10297 7.52877 9.36638 6.86567 9.36638C6.20257 9.36638 5.56663 9.10297 5.09775 8.63409C4.62887 8.16521 4.36546 7.52927 4.36546 6.86617C4.36546 6.20307 4.62887 5.56713 5.09775 5.09825ZM7.45525 6.27659C7.37788 6.19916 7.28602 6.13773 7.18491 6.09581C7.0838 6.05389 6.97542 6.03229 6.86596 6.03225C6.75651 6.03221 6.64811 6.05373 6.54697 6.09559C6.44583 6.13744 6.35393 6.1988 6.2765 6.27617C6.19908 6.35354 6.13765 6.4454 6.09573 6.54651C6.0538 6.64762 6.03221 6.756 6.03217 6.86546C6.03213 6.97492 6.05365 7.08331 6.0955 7.18445C6.13735 7.28559 6.19872 7.37749 6.27609 7.45492C6.43234 7.61129 6.64432 7.69918 6.86537 7.69926C7.08643 7.69933 7.29847 7.61159 7.45484 7.45534C7.6112 7.29908 7.69909 7.08711 7.69917 6.86605C7.69925 6.64499 7.61151 6.43295 7.45525 6.27659Z" fill="#44546F"/>
                </svg>
                <p class="text-sm text-[#44546F]">1189</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <!-- Changes Data Table -->
      <div class="bg-white rounded-lg border border-gray-200">
        <Datatable
          :items="viewChangesData"
          :columns="viewChangesColumns"
          :searchable="false"
          :sortable="false"
          :exportable="false"
          :pagination="true"
          :itemsPerPage="10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';

const route = useRoute();

// Get product name from route params
const productName = computed(() => {
  return route.params.productName as string || 'KESSINGTON KESARTEM TABLET 80/480X6';
});

// Breadcrumb title
const breadcrumbTitle = computed(() => {
  return `Products Management / All Products / ${productName.value}`;
});

// Table columns
const viewChangesColumns = ref([
  { label: 'User', field: 'user', sortable: false },
  { label: 'Batch Location', field: 'batchLocation', sortable: false },
  { label: 'Batch No.', field: 'batchNo', sortable: false },
  { label: 'Action', field: 'action', sortable: false },
  { label: 'Qty Change', field: 'qtyChange', sortable: false },
  { label: 'Old Product Qty', field: 'oldProductQty', sortable: false },
  { label: 'New Product Qty', field: 'newProductQty', sortable: false },
  { label: 'Old Batch Qty', field: 'oldBatchQty', sortable: false },
  { label: 'New Batch Qty', field: 'newBatchQty', sortable: false },
  { label: 'Expiry Date', field: 'expiryDate', sortable: false },
  { label: 'Date', field: 'date', sortable: false }
]);

// Mock data
const viewChangesData = ref([
  {
    user: 'Arogundade Aminat',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Update from order proce...',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Samuel Adegoke',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Update from order proce...',
    qtyChange: 1189,
    oldProductQty: 1189,
    newProductQty: 1189,
    oldBatchQty: 1189,
    newBatchQty: 1189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Arogundade Aminat',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 11,
    oldProductQty: 11,
    newProductQty: 11,
    oldBatchQty: 11,
    newBatchQty: 11,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Samuel Adegoke',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'order processing',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Samuel Adegoke',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Arogundade Aminat',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Samuel Adegoke',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Arogundade Aminat',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Samuel Adegoke',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  },
  {
    user: 'Arogundade Aminat',
    batchLocation: 'HD009 HD056 HD020 HD009 GW034 LC010 LC026 LC019 MC003 LC011 LA022 GW045 LC021 LC018',
    batchNo: 'LW377 | 01/08/2024',
    action: 'Updated',
    qtyChange: 189,
    oldProductQty: 189,
    newProductQty: 189,
    oldBatchQty: 189,
    newBatchQty: 189,
    expiryDate: '15/01/2025',
    date: '15/01/2025 01:41:31PM'
  }
]);
</script>