<template>
  <!-- Desktop Nav -->
  <nav class="relative z-40 hidden px-6 bg-white border-b sm:block app_navigation">
    <div class="mx-auto">
      <ul class="flex gap-x-6 navbar_menu">
        <li v-for="(item, index) in navItems" :key="`nav_dropdown_${index}`" class="text-center ">
          <!-- <NavDropDown v-if="item.dropdown" :title="item.label" :items="item.dropdown" /> -->
          <NavDropDown v-if="item.dropdown" :title="item.label" :items="item.dropdown"
            :isOpen="openDropdownIndex === index" @toggle="toggleDropdown(index)" @close="closeDropdown"
            :useThreeDots="item.useThreeDots" />
          <!-- <router-link v-else :to="item.url" class="block py-3 text-xs nav-link navigation-text" :class="{
            'border-b-2 border-blue-600 text-blue-600 ': isActive(item.url),
            'text-text-subtle hover:border-b-2 hover:border-gray-200':
              !isActive(item.url),
          }"> -->
          <router-link v-else :to="item.url"
            class="block py-3 text-xs border-b-2 border-transparent nav-link navigation-text text-text-subtle hover:border-gray-200"
            :class="{
              '!border-blue-600 !text-blue-600': isActive(item.url),
            }">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Mobile Nav -->
  <nav class="block px-4 bg-white border-b border-gray-200 sm:hidden">
    <div class="mx-auto">
      <ul class="flex justify-between">
        <li v-for="(item, index) in navItems" :key="index" class="flex-1 text-center">
          <NavDropDown v-if="item.dropdown" :title="item.label" :items="item.dropdown" />
          <router-link v-else :to="item.url" class="block py-3" :class="{
            'text-blue-600': isActive(item.url),
            'text-gray-500': !isActive(item.url),
          }">
            <component :is="item.icon" class="w-5 h-5 mx-auto" />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import NavDropDown from '@/views/Components/NavDropDown.vue'
interface Props {
  department: string;
}
import {
  LayoutDashboard,
  Truck,
  FileText,
  CreditCard,
  RotateCcw,
  PackageSearch,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-vue-next";

const props = defineProps<Props>();

const route = useRoute();

const navigation: Record<string, any[]> = {
  procurement: [
    { label: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { label: "All Suppliers", url: { name: 'procurements.suppliers.index' }, icon: Truck },
    { label: "Purchase Order", url: "/purchase", icon: FileText },
    { label: "Payments", url: "/payments", icon: CreditCard },
    { label: "Supplier's Return", url: "/suppliers-return", icon: RotateCcw },
    { label: "Product Requests", url: "/product-requests", icon: PackageSearch },
  ],
  inbound: [
    { label: "Dashboard", url: { name: "inbound.dashboard" }, icon: LayoutDashboard },
    { label: "Purchase Order", url: { name: "inbound.purchase_orders" }, icon: Truck },
    {
      label: "Products Management", url: "/purchase", icon: FileText, dropdown: [
        { title: "All Products", route: { name: 'admin.products' }, has_bottom_rule: true },
        { title: "Damaged Product", route: { name: 'admin.products.damages' } },
        { title: "Product Formulation", route: { name: 'admin.products.product_types' }, has_bottom_rule: true },
        { title: "Categories", route: { name: 'admin.categories' } },
        { title: "Manufacturers", route: { name: 'admin.manufacturers' } },
        { title: "Bulk Product Update", route: { name: 'admin.products.bulk_updates' }, has_bottom_rule: true },
        // { title: "Generate Barcode", route: 'here 2' },
      ]
    },
    {
      label: "Product Movement", url: "/purchase", icon: FileText, dropdown: [
        { title: "Returned Products", route: { name: 'admin.products.returned' } },
        { title: "Product Requests", route: { name: 'admin.products.requests' } },
      ]
    },
    {
      label: "Product Items", url: "/purchase", icon: FileText, dropdown: [
        { title: "Pending Product Notifications", route: { name: "admin.products.pending_notifications" } },
        { title: "Pending Product Transfers", route: { name: 'admin.products.pending_transfers' } },
        { title: "Pending Product Returns", route: { name: 'admin.products.returns' } },
      ]
    },
    { label: "Expiry Report", url: { name: 'admin.products.expiry_reports' }, icon: Truck },
    {
      label: "Locations", url: "/purchase", icon: FileText, dropdown: [
        { title: "Warehouses", route: { name: 'admin.locations.warehouses' } },
        { title: "Shelves", route: { name: 'admin.locations.shelves' } },
        { title: "Branches", route: { name: 'admin.locations.branches' } },
      ]
    },
    {
      label: "More Action", url: "/purchase", icon: FileText, useThreeDots: true, dropdown: [
        { title: "All Customers", route: { name: 'customer-success.customers' }, has_bottom_rule: true },
        { title: "All Suppliers", route: { name: 'inbound.suppliers.index' } },
        { title: "Supplier's Return", route: { name: 'inbound.suppliers.returns.index' }, has_bottom_rule: true },
        { title: "Deals", route: { name: 'inbound.deals.index' }, has_bottom_rule: true },
        { title: "Delivered Order", route: { name: 'inbound.orders.delivered' } },
      ]
    },
  ],
  outbound: [
    { label: "Dashboard", url: { name: "outbound.dashboard" }, icon: LayoutDashboard },
    { label: "All Orders", url: { name: "outbound.orders" }, icon: FileText },
    { label: "Delivered Orders", url: "/outbound/delivered", icon: Truck },
    { label: "Log Book", url: { name: "outbound.log-book" }, icon: FileText },
    { label: "Order Fulfillment", url: { name: "outbound.order-fulfillment" }, icon: PackageSearch },
    { 
      label: "Stock Count", 
      icon: RotateCcw,
      dropdown: [
        { title: "Stock Count Teams", route: { name: "outbound.stock-count.teams" } },
        { title: "Product Stock Count", route: { name: "outbound.stock-count.product" } }
      ]
    },
    { 
      label: "HMO - Pharm", 
      icon: CreditCard,
      dropdown: [
        { title: "All HMO Products", route: { name: "outbound.hmo-products" } },
        { title: "Damaged HMO Products", route: { name: "outbound.hmo-products.damaged" } },
        { title: "HMO Product Returns", route: { name: "outbound.hmo-products.returns" } },
        { title: "RH Orders", route: { name: "outbound.rh-orders" } }
      ]
    },
  ],
  compliance: [
    { label: "Dashboard", url: { name: "compliance.dashboard" }, icon: LayoutDashboard },
    { label: "KYC Verification", url: { name: "compliance.kyc" }, icon: FileText },
    { 
      label: "Products Management", 
      icon: PackageSearch,
      dropdown: [
        { title: "All Products", route: { name: "compliance.products" } },
        { title: "Damaged Products", route: { name: "compliance.products.damaged" } },
        { title: "Quarantined Products", route: { name: "compliance.products.quarantined" } }
      ]
    },
    { 
      label: "Orders & Fulfilment", 
      icon: Truck,
      dropdown: [
        { title: "Orders", route: { name: "compliance.orders" } },
        { title: "Delivered Orders", route: { name: "compliance.orders.delivered" } },
        { title: "Inventory Order Issues", route: { name: "compliance.orders.issues" } }
      ]
    },
    { 
      label: "Business Programs", 
      icon: CreditCard,
      dropdown: [
        { title: "Deals", route: { name: "compliance.deals" } },
        { title: "Loans", route: { name: "compliance.loans" } },
        { title: "Loyalty Program Progress", route: { name: "compliance.loyalty" } }
      ]
    },
    { 
      label: "Report", 
      icon: FileText,
      dropdown: [
        { title: "Expiry Report", route: { name: "compliance.reports.expiry" } },
        { title: "Stock Quantity Report", route: { name: "compliance.reports.stock" } }
      ]
    },
    { label: "More Actions", url: "/compliance", icon: FileText, useThreeDots: true, dropdown: [
        { title: "All Customers", route: { name: "compliance.customers" } },
        { title: "Returned Products", route: { name: "compliance.products.returned" } },
        { title: "Pending Product Returns", route: { name: "compliance.products.pending-returns" } }
      ]
    },
  ],
  logistics: [
    { label: "Dashboard", url: { name: "logistics.dashboard" }, icon: LayoutDashboard },
    { label: "Orders", url: { name: "logistics.orders" }, icon: FileText },
    { label: "Delivered Orders", url: { name: "logistics.delivered-orders" }, icon: Truck },
    { label: "Log Book", url: { name: "logistics.log-book" }, icon: FileText },
    { 
      label: "Hub Management", 
      icon: PackageSearch,
      dropdown: [
        { title: "Hubs", route: { name: "logistics.hub-management.hubs" } },
        { title: "Hub Staff", route: { name: "logistics.hub-management.hub-staff" } }
      ]
    },
    { label: "Vehicles", url: { name: "logistics.vehicles" }, icon: Truck },
    { label: "Drivers", url: { name: "logistics.drivers" }, icon: FileText },
    { label: "Delivery Types", url: { name: "logistics.delivery-types" }, icon: FileText },
    { label: "RH Orders", url: { name: "logistics.rh-orders" }, icon: CreditCard },
  ],
  "customer-success": [
    { label: "Dashboard", url: { name: "customer-success" }, icon: LayoutDashboard },
    { label: "KYC Verification", url: { name: "customer-success.kyc" }, icon: FileText },
    { 
      label: "Customers", 
      icon: Users,
      dropdown: [
        { title: "All Customers", route: { name: "customer-success.customers" } },
        { title: "Stores", route: { name: "customer-success.customers.stores" } },
        { title: "Feedback", route: { name: "customer-success.customers.feedback" } }
      ]
    },
    { 
      label: "Orders & Fulfilment", 
      icon: Truck,
      dropdown: [
        { title: "All Orders", route: { name: "customer-success.orders" } },
        { title: "Delivered Orders", route: { name: "customer-success.orders.delivered" } },
        { title: "Held Orders", route: { name: "customer-success.orders.held" } },
        { title: "Inventory Order Issues", route: { name: "customer-success.orders.inventory-issues" } },
        { title: "Orders Pending Payment", route: { name: "customer-success.orders.pending-payment" } },
        { title: "Customer Support Issues", route: { name: "customer-success.orders.support-issues" } }
      ]
    },
    { 
      label: "Business Programs", 
      icon: Star,
      dropdown: [
        { title: "Deals", route: { name: "customer-success.business-programs.deals" } },
        { title: "Loyalty Program", route: { name: "customer-success.business-programs.loyalty" } },
 
      ]
    },
        {
          label: "HMO & Pharmacy",
          icon: CreditCard,
          dropdown: [
            { title: "All HMOs", route: { name: "customer-success.hmo.products" } },
            { title: "HMO Products", route: { name: "customer-success.hmo.products" } },
            { title: "Damaged HMO Products", route: { name: "customer-success.hmo.products.damaged" } },
            { title: "HMO Product Returns", route: { name: "customer-success.hmo.products.returns" } },
            { title: "HMO Loans", route: { name: "customer-success.hmo.loans" } },
            { title: "Pharmacies", route: { name: "customer-success.hmo.pharmacies" } },
            { title: "Pharmacy Orders", route: { name: "customer-success.hmo.pharmacy-orders" } },
            { title: "Pharmacies Owed", route: { name: "customer-success.hmo.pharmacies-owed" } },
            { title: "RH Orders", route: { name: "customer-success.hmo.orders" } }
          ]
        },
    { 
      label: "Marketplace", 
      icon: PackageSearch,
      dropdown: [
        { title: "Partners", route: { name: "customer-success.marketplace.partners" } },
        { title: "Partner Orders", route: { name: "customer-success.marketplace.orders" } },
        { title: "Partner Profits", route: { name: "customer-success.marketplace.profits" } },
        { title: "Marketplace Product Returns", route: { name: "customer-success.marketplace.returns" } }
      ]
    },
    { 
      label: "More Actions", 
      icon: FileText,
      useThreeDots: true,
      dropdown: [
        { title: "Agent Performance", route: { name: "customer-success.more-actions.agent-performance" } },
        { title: "Line Managers", route: { name: "customer-success.more-actions.line-managers" } },
        { title: "Agents", route: { name: "customer-success.more-actions.agents" } },
        { title: "Products", route: { name: "customer-success.more-actions.products" } },
        { title: "Drivers", route: { name: "customer-success.more-actions.drivers" } }
      ]
    },
  ],
  "sales": [
    { label: "Dashboard", url: { name: "sales.dashboard" }, icon: LayoutDashboard },
    { label: "Lead Management", url: { name: "sales.leads" }, icon: Users },
    { label: "Opportunities", url: { name: "sales.opportunities" }, icon: FileText },
    { label: "Sales Pipeline", url: { name: "sales.pipeline" }, icon: TrendingUp },
    { label: "Sales Reports", url: { name: "sales.reports" }, icon: FileText },
  ],
  "marketing": [
    { label: "Dashboard", url: { name: "marketing.dashboard" }, icon: LayoutDashboard },
    { label: "Campaigns", url: { name: "marketing.campaigns" }, icon: FileText },
    { label: "Lead Generation", url: { name: "marketing.leads" }, icon: Users },
    { label: "Analytics", url: { name: "marketing.analytics" }, icon: TrendingUp },
    { label: "Content Management", url: { name: "marketing.content" }, icon: FileText },
  ],
  "tech-business-dev": [
    { label: "Dashboard", url: { name: "tech-business-dev.dashboard" }, icon: LayoutDashboard },
    { label: "Development Projects", url: { name: "tech-business-dev.projects" }, icon: FileText },
    { label: "Technical Support", url: { name: "tech-business-dev.support" }, icon: Users },
    { label: "Business Analysis", url: { name: "tech-business-dev.analysis" }, icon: TrendingUp },
    { label: "Innovation Lab", url: { name: "tech-business-dev.innovation" }, icon: Star },
  ],
}

const navItems = computed(() => {
  console.log("Navigation component - props.department:", props.department);
  console.log("Available navigation keys:", Object.keys(navigation));
  const items = navigation[props.department];
  console.log("Navigation items for department:", items);
  return items;
});

const isActive = (url: string) => route.path === url;

const openDropdownIndex = ref<number | null>(null)

const toggleDropdown = (index: number) => {
  openDropdownIndex.value = openDropdownIndex.value === index ? null : index
}

const closeDropdown = () => {
  openDropdownIndex.value = null
}
</script>
<style>
.app_navigation {
  border-bottom: 0.5px solid rgba(9, 30, 66, 0.14);
}

.app_navigation .navbar_menu .navigation-text {
  color: rgba(68, 84, 111, 1);
  font-weight: 500;
}

.app_navigation .navbar_menu .navigation-text.router-link-active.router-link-exact-active {
  color: rgba(12, 102, 228, 1);
  border-bottom: 2px solid rgba(12, 102, 228, 1);
}
</style>