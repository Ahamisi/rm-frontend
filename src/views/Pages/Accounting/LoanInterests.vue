<template>
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Business Programs / Loan Interest" />

    <!-- Contents -->
    <div class="px-0 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable 
        :items="loanInterests" 
        :columns="loanInterestColumns" 
        :searchable="true" 
        :filterByDate="false" 
        :printable="false" 
        :exportable="false" 
        :showActions="false"
        pageName="LoanInterests" 
        :key="childKey"
      >
        <template #header_actions>
          <div class="flex items-center gap-3">
            <Button type="blue-btn" :onClick="downloadReport" classStyle="px-3 py-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.687 17.292C10.5956 17.1997 10.4868 17.1264 10.3669 17.0764C10.247 17.0264 10.1184 17.0007 9.9885 17.0007C9.8586 17.0007 9.72998 17.0264 9.61009 17.0764C9.49019 17.1264 9.3814 17.1997 9.29 17.292C9.10466 17.4792 9.0007 17.732 9.0007 17.9955C9.0007 18.259 9.10466 18.5118 9.29 18.699L11.254 20.679C11.3546 20.7807 11.4744 20.8613 11.6064 20.9164C11.7384 20.9715 11.88 20.9998 12.023 20.9998C12.166 20.9998 12.3076 20.9715 12.4396 20.9164C12.5716 20.8613 12.6914 20.7807 12.792 20.679L14.711 18.746C14.8966 18.5587 15.0008 18.3057 15.0008 18.042C15.0008 17.7783 14.8966 17.5253 14.711 17.338C14.6196 17.2455 14.5107 17.1721 14.3907 17.122C14.2708 17.0719 14.142 17.0462 14.012 17.0462C13.882 17.0462 13.7532 17.0719 13.6333 17.122C13.5133 17.1721 13.4044 17.2455 13.313 17.338L12.023 18.638L10.687 17.292Z" fill="white"/>
                <path d="M13.001 19.993L13 10.006C13 9.451 12.552 9 12 9C11.448 9 11 9.45 11 10.007L11.001 19.994C11.001 20.549 11.449 21 12.001 21C12.553 21 13.001 20.55 13.001 19.993Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.938 5.48C7.68111 5.4383 7.42125 5.41757 7.161 5.418C4.356 5.418 2 7.62 2 10.498C2 13.409 4.385 16 7.1 16H9.981V14.007H7.1C5.443 14.007 3.985 12.344 3.985 10.499C3.985 8.721 5.454 7.412 7.089 7.412H7.101C7.49 7.412 7.787 7.462 8.071 7.562L8.241 7.625C8.846 7.873 9.116 7.379 9.116 7.379L9.266 7.112C9.996 5.765 11.467 5.016 12.982 4.992C13.9871 5.00203 14.9543 5.37742 15.703 6.04812C16.4517 6.71882 16.9309 7.63901 17.051 8.637L17.097 8.977C17.097 8.977 17.168 9.502 17.762 9.502C17.775 9.502 17.774 9.507 17.785 9.507H18.039C19.175 9.507 20.015 10.466 20.015 11.665C20.015 12.872 19.028 14.007 17.945 14.007H13.981V16H17.945C20.105 16 22 13.955 22 11.665C22 9.665 20.688 8.002 18.862 7.591C18.155 4.884 15.809 3.039 12.976 3C11.001 3.02 9.075 3.9 7.938 5.48Z" fill="white"/>
              </svg>
              Download Interest Report
            </Button>
          </div>
        </template>
        <template #column="col">
          <!-- ID -->
          <span v-if="col.props.column.field === 'id'">
            <span class="font-medium">{{ col.props.row.id }}</span>
          </span>
          
          <!-- Customer Name -->
          <span v-else-if="col.props.column.field === 'customerName'">
            <span>{{ col.props.row.customerName }}</span>
          </span>
          
          <!-- Store Name -->
          <span v-else-if="col.props.column.field === 'storeName'">
            <span class="text-gray-700">{{ col.props.row.storeName }}</span>
          </span>
          
          <!-- Total Interest -->
          <span v-else-if="col.props.column.field === 'totalInterest'">
            <span class="font-medium">{{ col.props.row.totalInterest }}</span>
          </span>
          
          <!-- Next Interest On -->
          <span v-else-if="col.props.column.field === 'nextInterestOn'">
            <span class="text-gray-700">{{ col.props.row.nextInterestOn }}</span>
          </span>
          
          <!-- Last Interest Incurred On -->
          <span v-else-if="col.props.column.field === 'lastInterestIncurredOn'">
            <span class="text-gray-700">{{ col.props.row.lastInterestIncurredOn }}</span>
          </span>
          
          <!-- Action Column -->
          <span v-else-if="col.props.column.field === 'action'">
            <button @click="viewLoanInterest(col.props.row)" class="text-blue-600 hover:text-blue-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C7.464 18 4.001 13.74 4.001 12C4.001 9.999 7.46 6 12.001 6C16.377 6 19.999 9.973 19.999 12C19.999 13.74 16.537 18 12.001 18H12ZM12.001 4C6.48 4 2 8.841 2 12C2 15.086 6.576 20 12 20C17.423 20 22 15.086 22 12C22 8.841 17.52 4 12 4" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.977 13.984C10.874 13.984 9.977 13.087 9.977 11.984C9.977 10.881 10.874 9.984 11.977 9.984C13.081 9.984 13.977 10.881 13.977 11.984C13.977 13.087 13.081 13.984 11.977 13.984ZM11.977 7.984C9.771 7.984 7.977 9.778 7.977 11.984C7.977 14.19 9.771 15.984 11.977 15.984C14.184 15.984 15.977 14.19 15.977 11.984C15.977 9.778 14.184 7.984 11.977 7.984Z" fill="currentColor"/>
              </svg>
            </button>
          </span>
          
          <!-- Default -->
          <span v-else class="text-xs">
            {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
          </span>
        </template>
      </Datatable>
    </div>

    <!-- Success Toast for Download Report -->
    <SuccessAlertToast 
      :isVisible="showDownloadReportToast" 
      message="Interest Report downloaded successfully" 
      @close="showDownloadReportToast = false" 
    />

    <!-- View Loan Interest Modal -->
    <SideBarModal 
      :is-open="showLoanInterestModal" 
      width="large" 
      @update:is-open="showLoanInterestModal = $event"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <span>Loans {{ selectedLoanInterest?.customerName?.toUpperCase() }}</span>
        </div>
      </template>

      <template #default="{ closeModal }">
        <div class="p-6">
          <!-- Customer Information Card -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-4">
              <!-- Avatar -->
              <div class="flex items-center justify-center">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path d="M0 6C0 2.68629 2.68629 0 6 0H38C41.3137 0 44 2.68629 44 6V38C44 41.3137 41.3137 44 38 44H6C2.68629 44 0 41.3137 0 38V6Z" fill="#DCDFE4"/>
                  <circle cx="22" cy="22" r="12" fill="url(#pattern0_11480_55637)"/>
                  <defs>
                    <pattern id="pattern0_11480_55637" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_11480_55637" transform="scale(0.0078125)"/>
                    </pattern>
                    <image id="image0_11480_55637" width="128" height="128" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
              
              <!-- Customer Info -->
              <div class="flex-1">
                <h3 class="font-semibold text-[#44546F]">{{ selectedLoanInterest?.customerName }}</h3>
                <div class="flex flex-col gap-2 mt-1">
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667ZM4.16667 4.16667V15.8333H15.8333V4.16667H4.16667Z" fill="#091E42" fill-opacity="0.31"/>
                      <path d="M2.5 6.66667H17.5V8.33333H2.5V6.66667Z" fill="#091E42" fill-opacity="0.31"/>
                      <path d="M7.5 10H12.5V11.6667H7.5V10Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedLoanInterest?.email }}
                  </div>
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83464 1.66675C4.91416 1.66675 4.16797 2.41294 4.16797 3.33341V16.6667C4.16797 17.5872 4.91416 18.3334 5.83464 18.3334H14.168C15.0884 18.3334 15.8346 17.5872 15.8346 16.6667V3.33341C15.8346 2.41294 15.0884 1.66675 14.168 1.66675H5.83464ZM14.168 3.33341H5.83464V14.1667H14.168V3.33341ZM11.668 15.8334H8.33464V16.6667H11.668V15.8334Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedLoanInterest?.phone }}
                  </div>
                  <div class="flex items-center gap-1 text-sm text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 9.16667H5V13.3333H3.33333V9.16667ZM3.79667 3.24C4.00083 2.83167 4.54167 2.5 5.005 2.5H14.9942C15.4575 2.5 15.9992 2.83167 16.2025 3.24L17.5 5.83333H2.5L3.79667 3.24ZM2.5 5.83333H17.5V6.66667H2.5V5.83333ZM15 9.16667H16.6667V13.3333H15V9.16667ZM2.5 6.66667C2.61667 7.60667 3.41167 8.33333 4.375 8.33333C5.33833 8.33333 6.13333 7.60667 6.25 6.66667H2.5ZM6.25 6.66667C6.36667 7.60667 7.16167 8.33333 8.125 8.33333C9.08833 8.33333 9.88333 7.60667 10 6.66667H6.25ZM10 6.66667C10.1167 7.60667 10.9117 8.33333 11.875 8.33333C12.8383 8.33333 13.6333 7.60667 13.75 6.66667H10ZM13.75 6.66667C13.8667 7.60667 14.6617 8.33333 15.625 8.33333C16.5883 8.33333 17.3833 7.60667 17.5 6.66667H13.75ZM3.33333 13.3333H16.6667V15.8292C16.6678 16.2711 16.4934 16.6953 16.1818 17.0086C15.8702 17.3219 15.4469 17.4987 15.005 17.5H4.995C4.77611 17.4997 4.55943 17.4562 4.35738 17.372C4.15532 17.2878 3.97187 17.1645 3.81751 17.0093C3.66316 16.8541 3.54094 16.67 3.45785 16.4675C3.37477 16.265 3.33246 16.0481 3.33333 15.8292V13.3333Z" fill="#091E42" fill-opacity="0.31"/>
                    </svg>
                    {{ selectedLoanInterest?.storeName }}
                  </div>
                </div>
              </div>
              
              <!-- Customer Type and Total Interest -->
              <div class="bg-white p-3 rounded-lg w-80">
                <div class="mb-4 flex items-center gap-2 align-center">
                  <label class="block text-sm font-medium text-[#44546F] mb-2">Customer Type</label>
                  <Pill 
                    type="hospital"
                    :text="selectedLoanInterest?.customerType || 'Super Distributor'"
                  />
                </div>
                <div class="flex items-center gap-2 align-center">
                  <label class="block text-sm text-[#44546F] mb-2">Total Interest</label>
                  <p class="text-[#172B4D] text-xs">{{ selectedLoanInterest?.totalInterest }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Loan Interest Datatable -->
          <Datatable 
            :items="loanInterestRecords" 
            :columns="loanInterestRecordColumns" 
            :searchable="true" 
            :filterByDate="false" 
            :printable="false" 
            :exportable="false" 
            :showActions="false"
            pageName="LoanInterestRecords" 
            :key="`loan-interest-${modalKey}`"
          >
            <template #column="col">
              <!-- ID -->
              <span v-if="col.props.column.field === 'id'">
                <span class="font-medium">{{ col.props.row.id }}</span>
              </span>
              
              <!-- Type -->
              <span v-else-if="col.props.column.field === 'type'">
                <span>{{ col.props.row.type }}</span>
              </span>
              
              <!-- Total Loan -->
              <span v-else-if="col.props.column.field === 'totalLoan'">
                <span class="font-medium">{{ col.props.row.totalLoan }}</span>
              </span>
              
              <!-- Rate (%) -->
              <span v-else-if="col.props.column.field === 'rate'">
                <span class="text-gray-700">{{ col.props.row.rate }}</span>
              </span>
              
              <!-- Interest -->
              <span v-else-if="col.props.column.field === 'interest'">
                <span class="font-medium">{{ col.props.row.interest }}</span>
              </span>
              
              <!-- Description -->
              <span v-else-if="col.props.column.field === 'description'">
                <span class="text-gray-700">{{ col.props.row.description || 'Nil' }}</span>
              </span>
              
              <!-- Date -->
              <span v-else-if="col.props.column.field === 'date'">
                <span class="text-gray-700">{{ col.props.row.date }}</span>
              </span>
              
              <!-- Default -->
              <span v-else class="text-xs">
                {{ (col.props.formattedRow as any)?.[col.props.column.field] || (col.props.row as any)?.[col.props.column.field] }}
              </span>
            </template>
          </Datatable>
        </div>
      </template>

      <template #footer="{ closeModal }">
        <div class="flex justify-end">
          <Button 
            type="blue-btn"
            :onClick="closeModal"
            classStyle="px-4 py-2"
          >
            Close
          </Button>
        </div>
      </template>
    </SideBarModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import Button from '@/views/Components/ui/Button.vue';
import SuccessAlertToast from '@/views/Components/SuccessAlertToast.vue';
import SideBarModal from '@/views/Components/SideBarModal.vue';
import Pill from '@/views/Components/ui/Pill.vue';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);
const showDownloadReportToast = ref(false);
const showLoanInterestModal = ref(false);
const selectedLoanInterest = ref<any>(null);
const modalKey = ref(0);

// Mock Loan Interests data
const loanInterests = ref([
  { id: 87, customerName: "Emeka Kalu", storeName: "Emeka Pharmacy", totalInterest: "₦2,055,043.00", nextInterestOn: "5/21/2024", lastInterestIncurredOn: "5/21/2024", email: "sleeknne4u1@gmail.com", phone: "+234 809 123 4567", customerType: "Super Distributor" },
  { id: 54, customerName: "Emmanuel Aba", storeName: "Emma Bros Pharmacy", totalInterest: "₦2,055,043.00", nextInterestOn: "5/21/2024", lastInterestIncurredOn: "5/21/2024", email: "emmanuel@gmail.com", phone: "+234 809 123 4568", customerType: "Super Distributor" },
  { id: 25, customerName: "Nyerhovwo Omuvwie", storeName: "Xela pharmacy", totalInterest: "₦2,055,043.00", nextInterestOn: "5/21/2024", lastInterestIncurredOn: "5/21/2024", email: "nyerhovwo@gmail.com", phone: "+234 809 123 4569", customerType: "Super Distributor" },
  { id: 30, customerName: "Oluwatosin Adegbo", storeName: "Tosin Pharmacy", totalInterest: "₦2,055,043.00", nextInterestOn: "5/21/2024", lastInterestIncurredOn: "5/21/2024", email: "oluwatosin@gmail.com", phone: "+234 809 123 4570", customerType: "Super Distributor" },
  { id: 51, customerName: "Jane Doe", storeName: "Jane's Pharmacy", totalInterest: "₦2,055,043.00", nextInterestOn: "5/21/2024", lastInterestIncurredOn: "5/21/2024", email: "jane@gmail.com", phone: "+234 809 123 4571", customerType: "Super Distributor" }
]);

// Mock Loan Interest Records (for the modal)
const loanInterestRecords = ref([
  { id: 54, type: "Interest", totalLoan: "₦2,055,043.00", rate: "0.1", interest: "₦2,055,043.00", description: "Nil", date: "16/01/2025 10:39 AM" }
]);

// Table columns
const loanInterestColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customerName', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Total Interest', field: 'totalInterest', sortable: true },
  { label: 'Next Interest On', field: 'nextInterestOn', sortable: true },
  { label: 'Last Interest Incurred On', field: 'lastInterestIncurredOn', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

const loanInterestRecordColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Type', field: 'type', sortable: true },
  { label: 'Total Loan', field: 'totalLoan', sortable: true },
  { label: 'Rate (%)', field: 'rate', sortable: true },
  { label: 'Interest', field: 'interest', sortable: true },
  { label: 'Description', field: 'description', sortable: true },
  { label: 'Date', field: 'date', sortable: true }
];

// Actions
const viewLoanInterest = (loanInterest: any) => {
  selectedLoanInterest.value = loanInterest;
  showLoanInterestModal.value = true;
  modalKey.value++;
};

const downloadReport = () => {
  showDownloadReportToast.value = true;
};
</script>
