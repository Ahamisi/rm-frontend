<template>
  <div class="px-6 erp_dashboard_wrapper">
    <!-- Header -->
    <PageTitle title="Business Programs / Admin Loan" />

    <!-- Contents -->
    <div class="px-0 mt-0 bg-white min-h-[calc(100vh-190px)]">
      <Datatable 
        :items="adminLoans" 
        :columns="adminLoanColumns" 
        :searchable="true" 
        :filterByDate="false" 
        :printable="false" 
        :exportable="false" 
        :showActions="false"
        pageName="AdminLoans" 
        :key="childKey"
      >
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
          
          <!-- Total Amount -->
          <span v-else-if="col.props.column.field === 'totalAmount'">
            <span class="font-medium">{{ col.props.row.totalAmount }}</span>
          </span>
          
          <!-- Loan Type -->
          <span v-else-if="col.props.column.field === 'loanType'">
            <span class="text-gray-700">{{ col.props.row.loanType }}</span>
          </span>
          
          <!-- Description -->
          <span v-else-if="col.props.column.field === 'description'">
            <span class="text-gray-700">{{ col.props.row.description }}</span>
          </span>
          
          <!-- Order -->
          <span v-else-if="col.props.column.field === 'order'">
            <span class="text-gray-500">{{ col.props.row.order || '--' }}</span>
          </span>
          
          <!-- Created by -->
          <span v-else-if="col.props.column.field === 'createdBy'">
            <div class="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#DCDFE4"/>
                <circle cx="10" cy="7" r="3" fill="#626F86"/>
                <path d="M4 17C4 14 6.5 12 10 12C13.5 12 16 14 16 17V18H4V17Z" fill="#626F86"/>
              </svg>
              <span class="text-gray-700">{{ col.props.row.createdBy }}</span>
            </div>
          </span>
          
          <!-- Date -->
          <span v-else-if="col.props.column.field === 'date'">
            <span class="text-gray-700">{{ col.props.row.date }}</span>
          </span>
          
          <!-- Action Column -->
          <span v-else-if="col.props.column.field === 'action'">
            <button @click="deleteLoan(col.props.row)" class="text-red-600 hover:text-red-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C4.73478 5 4.48043 5.10536 4.29289 5.29289C4.10536 5.48043 4 5.73478 4 6V7H20V6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5H5ZM16.15 20H7.845C7.60844 19.9999 7.37956 19.916 7.19904 19.7631C7.01851 19.6102 6.89803 19.3983 6.859 19.165L5 8H19L17.136 19.166C17.0969 19.3992 16.9764 19.611 16.7959 19.7637C16.6153 19.9165 16.3865 20.0002 16.15 20ZM9 4.5C8.99998 4.36894 9.05142 4.2431 9.14325 4.14959C9.23508 4.05608 9.35996 4.00236 9.491 4H14.509C14.64 4.00236 14.7649 4.05608 14.8567 4.14959C14.9486 4.2431 15 4.36894 15 4.5V5H9V4.5Z" fill="currentColor"/>
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

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      :message="deleteMessage"
      confirmText="Delete Loan"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      title="Loan Deleted"
      :message="successMessage"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/views/Components/header/PageTitle.vue';
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import DeleteConfirmationModal from '@/views/Components/ui/DeleteConfirmationModal.vue';
import SuccessModal from '@/views/Components/ui/SuccessModal.vue';
import type { TableColumn } from '@/types';

// Reactive state
const childKey = ref(1);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const selectedLoan = ref<any>(null);

// Mock Admin Loans data
const adminLoans = ref([
  { id: 87, customerName: "Emeka Kalu", storeName: "Emeka Pharmacy", totalAmount: "₦2,055,043.00", loanType: "Repay", description: "Access bank main bank account", order: "--", createdBy: "Jane Rotanson", date: "5/21/2024" },
  { id: 54, customerName: "Emmanuel Aba", storeName: "Emma Bros Pharmacy", totalAmount: "₦2,055,043.00", loanType: "Request", description: "RHS Access bank", order: "--", createdBy: "Esther Joel", date: "5/21/2024" },
  { id: 25, customerName: "Nyerhovwo Omuvwie", storeName: "Xela pharmacy", totalAmount: "₦2,055,043.00", loanType: "Repay", description: "Access bank main bank account", order: "--", createdBy: "Femi Babalola", date: "5/21/2024" },
  { id: 30, customerName: "Oluwatosin Adegbo", storeName: "Tosin Pharmacy", totalAmount: "₦2,055,043.00", loanType: "Request", description: "RHS Access bank", order: "--", createdBy: "Sarah Badmus", date: "5/21/2024" },
  { id: 51, customerName: "Jane Doe", storeName: "Jane's Pharmacy", totalAmount: "₦2,055,043.00", loanType: "Repay", description: "Access bank main bank account", order: "--", createdBy: "Josh Michael", date: "5/21/2024" },
  { id: 62, customerName: "John Smith", storeName: "Smith Medical", totalAmount: "₦2,055,043.00", loanType: "Request", description: "RHS Access bank", order: "--", createdBy: "Jane Rotanson", date: "5/21/2024" },
  { id: 73, customerName: "Mary Johnson", storeName: "Johnson Health", totalAmount: "₦2,055,043.00", loanType: "Repay", description: "Access bank main bank account", order: "--", createdBy: "Esther Joel", date: "5/21/2024" },
  { id: 84, customerName: "David Brown", storeName: "Brown Pharmacy", totalAmount: "₦2,055,043.00", loanType: "Request", description: "RHS Access bank", order: "--", createdBy: "Femi Babalola", date: "5/21/2024" }
]);

// Table columns
const adminLoanColumns: TableColumn[] = [
  { label: 'ID', field: 'id', sortable: true },
  { label: 'Customer Name', field: 'customerName', sortable: true },
  { label: 'Store Name', field: 'storeName', sortable: true },
  { label: 'Total Amount', field: 'totalAmount', sortable: true },
  { label: 'Loan Type', field: 'loanType', sortable: true },
  { label: 'Description', field: 'description', sortable: true },
  { label: 'Order', field: 'order', sortable: true },
  { label: 'Created by', field: 'createdBy', sortable: true },
  { label: 'Date', field: 'date', sortable: true },
  { label: 'Action', field: 'action', sortable: false }
];

// Computed messages
const deleteMessage = computed(() => {
  if (!selectedLoan.value) return '';
  return `You are about to delete this ${selectedLoan.value.customerName} loan of "${selectedLoan.value.totalAmount}".`;
});

const successMessage = computed(() => {
  if (!selectedLoan.value) return '';
  return `The ${selectedLoan.value.customerName} loan of "${selectedLoan.value.totalAmount}" has been successfully deleted from the system.`;
});

// Actions
const deleteLoan = (loan: any) => {
  selectedLoan.value = loan;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (!selectedLoan.value) return;
  
  // Remove loan from the list
  const index = adminLoans.value.findIndex(loan => loan.id === selectedLoan.value.id);
  if (index > -1) {
    adminLoans.value.splice(index, 1);
  }
  
  // Close delete modal
  showDeleteModal.value = false;
  
  // Show success modal
  setTimeout(() => {
    showSuccessModal.value = true;
    childKey.value++;
  }, 300);
};
</script>
