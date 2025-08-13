# API Mocking System

This directory contains a comprehensive API mocking system for frontend development. The system allows you to develop and test the frontend without needing a backend server.

## 🚀 Quick Start

The mocking system is **automatically enabled** in development mode. Just run:

```bash
npm run dev
```

All API calls will be intercepted and return realistic mock data.

## 📁 File Structure

```
src/api/
├── index.ts          # Main API configuration with mock integration
├── mock.ts           # Complete mocking system with realistic data
├── auth.ts           # Authentication API endpoints
├── products.ts       # Products API endpoints
├── suppliers.ts      # Suppliers API endpoints
├── dashboard.ts      # Dashboard API endpoints
└── README.md         # This documentation
```

## 🎭 Mock Features

### Realistic Data
- **50+ products** with categories, types, manufacturers
- **20+ suppliers** with complete contact information
- **30+ purchase orders** with different statuses
- **25+ invoices** with realistic amounts
- **Dashboard statistics** with growth metrics
- **User authentication** with JWT tokens

### Smart Pagination
- Supports `page` and `perPage` parameters
- Returns proper pagination metadata
- Handles search and filtering

### Dynamic Responses
- Simulates network delays (1 second for login)
- Generates unique IDs for new records
- Maintains data relationships

## 🔧 Configuration

### Environment Variables

Create `.env.development`:
```env
VITE_MOCK_API=true
VITE_API_URL=http://localhost:8000/api
VITE_API_V2_URL=http://localhost:8000/api/v2
```

### Disable Mocking

To disable mocking and use real APIs:
```env
VITE_MOCK_API=false
```

## 📊 Available Mock Endpoints

### Authentication
- `POST /login` - User login with token
- `GET /user` - Get current user
- `GET /users/departments` - Get user departments
- `POST /logout` - User logout

### Products
- `GET /products` - List products (paginated, searchable)
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `GET /search_products_typeahead` - Product search
- `GET /categories` - Product categories
- `GET /product_types` - Product types
- `GET /manufacturers` - Manufacturers
- `GET /warehouses` - Warehouses
- `GET /shelves` - Storage shelves

### Suppliers
- `GET /suppliers` - List suppliers (paginated)
- `GET /suppliers/:id` - Get single supplier
- `POST /suppliers` - Create supplier
- `PUT /suppliers/:id` - Update supplier

### Dashboard & Admin
- `GET /dashboard_stats` - Dashboard statistics
- `GET /branches` - Company branches
- `GET /states` - Nigerian states
- `GET /purchase_orders` - Purchase orders
- `GET /invoices` - Invoices

## 🛠️ Usage Examples

### Using the API modules:

```typescript
import { getProducts, searchProducts } from '@/api/products'
import { login } from '@/api/auth'
import { getSuppliers } from '@/api/suppliers'
import { getDashboardStats } from '@/api/dashboard'

// Get paginated products
const products = await getProducts({ page: 1, perPage: 10 })

// Search products
const searchResults = await searchProducts('paracetamol')

// Login user
const response = await login({ 
  phone: '08012345678', 
  password: 'password' 
})

// Get dashboard stats
const stats = await getDashboardStats({
  from_date: '2024-01-01',
  to_date: '2024-12-31'
})
```

### Using composables (existing pattern):

```typescript
import { useDashboard } from '@/views/Composables/useDashboard'
import { useSupplierForm } from '@/views/Composables/procurement/useSupplierForm'

const { fetchBranches, fetchDashboardStats } = useDashboard()
const { createSupplier } = useSupplierForm()

// These will automatically use mocked data
const branches = await fetchBranches()
const stats = await fetchDashboardStats()
```

## 🔍 Mock Data Details

### Products
- Realistic pharmaceutical names and descriptions
- Price ranges: ₦600-₦10,500 per pack
- Unit costs: ₦200-₦5,100
- Categories: Antibiotics, Pain Relief, Vitamins, etc.
- Types: Tablet, Capsule, Syrup, Injection, Cream
- Stock quantities and expiry dates

### Suppliers
- Nigerian phone numbers (080xxxxxxxx format)
- Realistic company names and addresses
- Bank account information
- Contact persons

### Dashboard Stats
- Total orders: 1,250
- Revenue: ₦15.75M total, ₦2.5M this month
- Growth metrics: 13.6% month-over-month
- Product counts and low stock alerts

## 🎯 Adding New Mock Endpoints

1. **Add handler to `mock.ts`:**
```typescript
'GET /new-endpoint': async (config) => {
  return createMockResponse({ data: 'your mock data' })
}
```

2. **Create API function:**
```typescript
// In appropriate API module
export const getNewData = () => api.get('/new-endpoint')
```

3. **Test the endpoint:**
```typescript
import { getNewData } from '@/api/your-module'
const data = await getNewData()
```

## 🐛 Debugging

Mock API calls are logged to the console:
```
🎭 Mock API: GET /products
🎭 Mock API: POST /login
🎭 Mock API: GET /dashboard_stats
```

## 🚀 Production Ready

The mocking system is designed to be:
- **Zero-impact** on production builds
- **Type-safe** with TypeScript interfaces
- **Compatible** with existing code patterns
- **Easily removable** when backend is ready

## 📝 Notes

- Mock data persists only during the browser session
- Network delays are simulated for realistic testing
- All endpoints return proper HTTP status codes
- Error scenarios can be simulated by modifying handlers
- The system works with both the centralized `api` instance and direct `axios` calls 