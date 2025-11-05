<template>
  <div class="erp_dashboard_wrapper grey_bg">
    <PageTitle title="Settings" class="px-6" />

    <div class="px-6 py-6">
      <div class="max-w-[70%] mx-auto">
        <div class="flex gap-6">
          <!-- Left Sidebar - Sections Navigation -->
          <div class="w-64 flex-shrink-0">
            <div class="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <h3 class="text-sm font-semibold text-gray-900 mb-4">Sections</h3>
              <nav class="space-y-2">
                <a
                  v-for="section in sections"
                  :key="section.id"
                  @click="scrollToSection(section.id)"
                  :class="[
                    'block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                    activeSection === section.id
                      ? 'font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  ]"
                >
                  {{ section.label }}
                </a>
              </nav>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="flex-1">
          <!-- Order Management Section -->
          <section
            id="order-management"
            ref="orderManagementRef"
            class="bg-white rounded-lg shadow-sm border p-6 mb-6"
            style="scroll-margin-top: 120px;"
          >
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Order Management</h2>

            <div class="space-y-6">
              <!-- Disable Orders Checkbox -->
              <div>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="settings.orderManagement.disableOrders"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm font-medium text-gray-700">Disable Orders</span>
                </label>
              </div>

              <!-- Message Textarea -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message to display when orders are disabled
                </label>
                <textarea
                  v-model="settings.orderManagement.disabledMessage"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter message..."
                ></textarea>
              </div>

              <!-- Max Quantity per Order -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Max Quantity per Order
                </label>
                <input
                  type="number"
                  v-model.number="settings.orderManagement.maxQuantity"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p class="text-xs text-gray-500 mt-1">Items per order fulfilment.</p>
              </div>

              <!-- Express Delivery Limit -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Express Delivery Limit
                </label>
                <input
                  type="number"
                  v-model.number="settings.orderManagement.expressDeliveryLimit"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p class="text-xs text-gray-500 mt-1">Max items for express orders.</p>
              </div>
            </div>
          </section>

          <!-- Pricing & Financial Controls Section -->
          <section
            id="pricing-financial"
            ref="pricingRef"
            class="bg-white rounded-lg shadow-sm border p-6 mb-6"
            style="scroll-margin-top: 120px;"
          >
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Pricing & Financial Controls</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Chemist Minimum Price -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Chemist Minimum Price
                </label>
                <NairaInput
                  v-model="settings.pricing.chemistMinimumPrice"
                  placeholder="0.00"
                />
              </div>

              <!-- Delivery Cap Limit -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Cap Limit
                </label>
                <NairaInput
                  v-model="settings.pricing.deliveryCapLimit"
                  placeholder="0.00"
                />
              </div>

              <!-- Driver Fines Amount -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Driver Fines Amount
                </label>
                <NairaInput
                  v-model="settings.pricing.driverFinesAmount"
                  placeholder="0.00"
                />
              </div>

              <!-- Price Increase Percentage -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Price Increase Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.001"
                  v-model.number="settings.pricing.priceIncreasePercentage"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p class="text-xs text-gray-500 mt-1">Product price markup.</p>
              </div>
            </div>
          </section>

          <!-- Customer Rewards Section -->
          <section
            id="customer-rewards"
            ref="customerRewardsRef"
            class="bg-white rounded-lg shadow-sm border p-6 mb-6"
            style="scroll-margin-top: 120px;"
          >
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Customer Rewards</h2>

            <!-- Info Banner -->
            <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <p class="text-sm text-blue-800">
                Bonus percentages for KYC Tier 3 customers based on their payment history.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Monthly Bonus -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Bonus (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="settings.customerRewards.monthlyBonus"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Yearly Bonus -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Yearly Bonus (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  v-model.number="settings.customerRewards.yearlyBonus"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/views/Components/header/PageTitle.vue";
import NairaInput from "@/views/Components/ui/NairaInput.vue";
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const sections = [
  { id: 'order-management', label: 'Order Management' },
  { id: 'pricing-financial', label: 'Pricing & Financial Controls' },
  { id: 'customer-rewards', label: 'Customer Rewards' }
];

const activeSection = ref('order-management');

const orderManagementRef = ref<HTMLElement | null>(null);
const pricingRef = ref<HTMLElement | null>(null);
const customerRewardsRef = ref<HTMLElement | null>(null);

const settings = ref({
  orderManagement: {
    disableOrders: false,
    disabledMessage: 'Placing of orders is unavailable right now! Please try again later.',
    maxQuantity: 500,
    expressDeliveryLimit: 100
  },
  pricing: {
    chemistMinimumPrice: '50000.00',
    deliveryCapLimit: '15000.00',
    driverFinesAmount: '1000.00',
    priceIncreasePercentage: 0.005
  },
  customerRewards: {
    monthlyBonus: 1.0,
    yearlyBonus: 0.2
  }
});

const scrollToSection = (sectionId: string) => {
  console.log('🔍 scrollToSection called with:', sectionId);
  activeSection.value = sectionId;
  
  // Use nextTick to ensure DOM is updated
  nextTick(() => {
    // Use refs directly for more reliable scrolling
    let targetElement: HTMLElement | null = null;
    
    if (sectionId === 'order-management' && orderManagementRef.value) {
      targetElement = orderManagementRef.value;
    } else if (sectionId === 'pricing-financial' && pricingRef.value) {
      targetElement = pricingRef.value;
    } else if (sectionId === 'customer-rewards' && customerRewardsRef.value) {
      targetElement = customerRewardsRef.value;
    }
    
    console.log('🔍 Target element from ref:', targetElement);
    
    if (targetElement) {
      // Use scrollIntoView with scroll-margin-top for offset
      // The scroll-mt-4 class should handle the offset
      console.log('✅ Using scrollIntoView for:', sectionId);
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Also try window.scrollTo with offset calculation as backup
      setTimeout(() => {
        const rect = targetElement!.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const headerOffset = 120;
        const offsetPosition = elementTop - headerOffset;
        
        console.log('📍 Backup scrollTo calculation:', {
          rectTop: rect.top,
          pageYOffset: window.pageYOffset,
          elementTop,
          headerOffset,
          offsetPosition,
          finalScroll: Math.max(0, offsetPosition)
        });
        
        // Try scrolling the window as well
        if (offsetPosition > 0) {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      console.error('❌ Element ref not found for sectionId:', sectionId);
      // Fallback to getElementById
      const element = document.getElementById(sectionId);
      if (element) {
        console.log('✅ Found element via getElementById, using scrollIntoView');
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      } else {
        console.error('❌ Element not found via getElementById either!');
      }
    }
  });
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + 150; // Offset for header

  // Check which section is currently in view (check from bottom to top)
  if (customerRewardsRef.value) {
    const rewardsRect = customerRewardsRef.value.getBoundingClientRect();
    const rewardsTop = rewardsRect.top + window.pageYOffset;
    if (scrollPosition >= rewardsTop - 150) {
      if (activeSection.value !== 'customer-rewards') {
        console.log('📌 Active section: customer-rewards');
        activeSection.value = 'customer-rewards';
      }
      return;
    }
  }
  
  if (pricingRef.value) {
    const pricingRect = pricingRef.value.getBoundingClientRect();
    const pricingTop = pricingRect.top + window.pageYOffset;
    if (scrollPosition >= pricingTop - 150) {
      if (activeSection.value !== 'pricing-financial') {
        console.log('📌 Active section: pricing-financial');
        activeSection.value = 'pricing-financial';
      }
      return;
    }
  }
  
  if (orderManagementRef.value) {
    const orderRect = orderManagementRef.value.getBoundingClientRect();
    const orderTop = orderRect.top + window.pageYOffset;
    if (scrollPosition >= orderTop - 150) {
      if (activeSection.value !== 'order-management') {
        console.log('📌 Active section: order-management');
        activeSection.value = 'order-management';
      }
      return;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Set initial active section
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.erp_dashboard_wrapper {
  min-height: 100vh;
}

.grey_bg {
  background-color: #F7F8F9 !important;
}

.scroll-mt-4 {
  scroll-margin-top: 1rem;
}
</style>

