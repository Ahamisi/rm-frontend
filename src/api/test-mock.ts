// Test file to verify mock API system
// Run this in browser console to test mocking

import { getProducts, searchProducts } from './products'
import { login } from './auth'
import { getSuppliers } from './suppliers'
import { getDashboardStats } from './dashboard'

export async function testMockAPIs() {
  console.log('🧪 Testing Mock API System...\n')

  try {
    // Test authentication
    console.log('1. Testing Authentication...')
    const authResponse = await login({ phone: '08012345678', password: 'password' })
    console.log('✅ Login successful:', authResponse.data)

    // Test products
    console.log('\n2. Testing Products...')
    const productsResponse = await getProducts({ page: 1, perPage: 5 })
    console.log('✅ Products loaded:', productsResponse.data.data.length, 'items')

    // Test product search
    console.log('\n3. Testing Product Search...')
    const searchResponse = await searchProducts('Product 1')
    console.log('✅ Search results:', searchResponse.data.length, 'items')

    // Test suppliers
    console.log('\n4. Testing Suppliers...')
    const suppliersResponse = await getSuppliers({ page: 1, perPage: 3 })
    console.log('✅ Suppliers loaded:', suppliersResponse.data.data.length, 'items')

    // Test dashboard
    console.log('\n5. Testing Dashboard...')
    const dashboardResponse = await getDashboardStats()
    console.log('✅ Dashboard stats loaded:', dashboardResponse.data)

    console.log('\n🎉 All mock APIs working correctly!')
    return true

  } catch (error) {
    console.error('❌ Mock API test failed:', error)
    return false
  }
}

// Auto-run test in development
if (import.meta.env.DEV) {
  console.log('🎭 Mock API system is active!')
  console.log('Run testMockAPIs() in console to test all endpoints')
}

// Make available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).testMockAPIs = testMockAPIs
} 