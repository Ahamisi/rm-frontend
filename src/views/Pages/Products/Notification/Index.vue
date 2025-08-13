<template>
    <div class="erp_dashboard_wrapper">

        <!-- Header -->
        <PageTitle title="Pending Items / Pending Product Notification" class="px-6" />

        <div class="px-6 min-h-[calc(100vh-190px)]">
            <Datatable :url="url" :filterByDate="true" :columns="newColumns" pageName="ProductPendingNotification">
                <template #column="col">
                    <span v-if="col.props.column.field == 'users_to_notify_count'">
                        <a href="#" @click.prevent="showUsers(col.props.row)"
                            class="font-medium text-gray-900 hover:text-main-light hover:underline">
                            {{ col.props.row.users_to_notify_count }}
                        </a>
                    </span>
                    <span v-else>
                        {{ col.props.formattedRow[col.props.column.field] }}
                    </span>
                </template>
            </Datatable>
        </div>

        <SideBarModal :title="currentProduct.name" :is-open="isUserToNotifyModalOpen" width="xl"
            @update:is-open="isUserToNotifyModalOpen = $event" @close="isUserToNotifyModalOpen = false">
            <!-- Main content -->
            <template #default>
                <div class="space-y-6">
                    <Datatable :columns="columns" :datefilter="false" pagename="usersToNotify" :url="users_to_notify_ur"
                        :key="childKey" v-if="currentProduct.id !== ''"></Datatable>
                </div>
            </template>
        </SideBarModal>

    </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageTitle from "@/views/Components/header/PageTitle.vue";
import Datatable from '@/views/Components/Datatable/Datatable.vue';
import { TableColumn } from '@/types';
import SideBarModal from '@/views/Components/SideBarModal.vue';


const isUserToNotifyModalOpen = ref(false)

const columns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'Store',
        field: 'stores',
        sortable: false,
        format: (value) => value.map((store) => store.name).join(", ")
    },
    {
        label: 'Phone',
        field: 'phone',
        sortable: false,
    },
    {
        label: 'Email',
        field: 'email',
        sortable: false,
    },
])

const newColumns = ref<TableColumn[]>([
    {
        label: 'ID',
        field: 'id',
        sortable: true,
    },
    {
        label: 'Name',
        field: 'name',
        sortable: true,
    },
    {
        label: 'No. of Notifications',
        field: 'users_to_notify_count',
        sortable: true,
    },
]);
const url = computed(() => import.meta.env.VITE_API_V2_URL + 'product/pending_notifications');
const users_to_notify_ur = computed(() => import.meta.env.VITE_API_URL + `product/pending_notifications/${currentProduct.value.id}`)
const childKey = ref(1000)
const currentProduct = ref({ id: '', name: '' })

const showUsers = (product) => {
    currentProduct.value = product;
    childKey.value++;
    isUserToNotifyModalOpen.value = false;
}
</script>

<style></style>
