// Mock API System for Frontend Development
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Enable/disable mocking
export const MOCK_ENABLED = import.meta.env.VITE_MOCK_API === 'true' || import.meta.env.DEV;

// Mock data generators
const generateId = () => Math.floor(Math.random() * 1000) + 1;
const generateDate = () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();

// Mock data stores
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    role: "admin",
    department: "procurement",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "08087654321",
    role: "manager",
    department: "inventory",
    created_at: generateDate(),
    updated_at: generateDate(),
  }
];

const mockBranches = [
  {
    id: 1,
    name: "LAGOS",
    address: "123 Lagos Street, Lagos State",
    has_barcode: 1,
    created_at: "2024-02-26T14:04:30.000000Z",
    updated_at: "2024-05-27T07:07:54.000000Z",
    use_order_fulfilment: 1,
  },
  {
    id: 2,
    name: "ABUJA",
    address: "456 Abuja Avenue, FCT",
    has_barcode: 1,
    created_at: generateDate(),
    updated_at: generateDate(),
    use_order_fulfilment: 1,
  },
  {
    id: 3,
    name: "PORT HARCOURT",
    address: "789 PH Road, Rivers State",
    has_barcode: 0,
    created_at: generateDate(),
    updated_at: generateDate(),
    use_order_fulfilment: 0,
  }
];

const mockCategories = [
  { id: 1, name: "Antibiotics", created_at: generateDate(), updated_at: generateDate() },
  { id: 2, name: "Pain Relief", created_at: generateDate(), updated_at: generateDate() },
  { id: 3, name: "Vitamins", created_at: generateDate(), updated_at: generateDate() },
  { id: 4, name: "Antiseptics", created_at: generateDate(), updated_at: generateDate() },
  { id: 5, name: "Cardiovascular", created_at: generateDate(), updated_at: generateDate() },
];

const mockProductTypes = [
  { id: 1, name: "Tablet", created_at: generateDate(), updated_at: generateDate() },
  { id: 2, name: "Capsule", created_at: generateDate(), updated_at: generateDate() },
  { id: 3, name: "Syrup", created_at: generateDate(), updated_at: generateDate() },
  { id: 4, name: "Injection", created_at: generateDate(), updated_at: generateDate() },
  { id: 5, name: "Cream", created_at: generateDate(), updated_at: generateDate() },
];

const mockManufacturers = [
  { id: 1, name: "Pfizer", created_at: generateDate(), updated_at: generateDate() },
  { id: 2, name: "GSK", created_at: generateDate(), updated_at: generateDate() },
  { id: 3, name: "Novartis", created_at: generateDate(), updated_at: generateDate() },
  { id: 4, name: "Roche", created_at: generateDate(), updated_at: generateDate() },
  { id: 5, name: "Emzor", created_at: generateDate(), updated_at: generateDate() },
];

const mockWarehouses = [
  { id: 1, name: "Main Warehouse", location: "Lagos", created_at: generateDate(), updated_at: generateDate() },
  { id: 2, name: "Secondary Warehouse", location: "Abuja", created_at: generateDate(), updated_at: generateDate() },
];

const mockShelves = [
  { id: 1, name: "A1", warehouse_id: 1, created_at: generateDate(), updated_at: generateDate() },
  { id: 2, name: "A2", warehouse_id: 1, created_at: generateDate(), updated_at: generateDate() },
  { id: 3, name: "B1", warehouse_id: 2, created_at: generateDate(), updated_at: generateDate() },
];

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `Description for product ${i + 1}`,
  price_per_pack: Math.floor(Math.random() * 10000) + 500,
  unit_cost: Math.floor(Math.random() * 5000) + 100,
  min_reorder: Math.floor(Math.random() * 50) + 10,
  category_id: mockCategories[Math.floor(Math.random() * mockCategories.length)].id,
  product_type_id: mockProductTypes[Math.floor(Math.random() * mockProductTypes.length)].id,
  manufacturer_id: mockManufacturers[Math.floor(Math.random() * mockManufacturers.length)].id,
  warehouse_id: mockWarehouses[Math.floor(Math.random() * mockWarehouses.length)].id,
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  quantity: Math.floor(Math.random() * 1000),
  expiry_date: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  created_at: generateDate(),
  updated_at: generateDate(),
}));

const mockSuppliers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Supplier ${i + 1}`,
  email: `supplier${i + 1}@example.com`,
  phone: `080${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
  address: `${i + 1} Supplier Street, Lagos`,
  contact_person: `Contact Person ${i + 1}`,
  bank_name: "First Bank",
  account_number: String(Math.floor(Math.random() * 10000000000)).padStart(10, '0'),
  created_at: generateDate(),
  updated_at: generateDate(),
}));

const mockPurchaseOrders = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  po_number: `PO-${String(i + 1).padStart(4, '0')}`,
  supplier_id: mockSuppliers[Math.floor(Math.random() * mockSuppliers.length)].id,
  branch_id: mockBranches[Math.floor(Math.random() * mockBranches.length)].id,
  status: ['pending', 'approved', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
  total_amount: Math.floor(Math.random() * 1000000) + 10000,
  created_at: generateDate(),
  updated_at: generateDate(),
  items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
    id: j + 1,
    product_id: mockProducts[Math.floor(Math.random() * mockProducts.length)].id,
    quantity: Math.floor(Math.random() * 100) + 1,
    unit_price: Math.floor(Math.random() * 5000) + 100,
  }))
}));

const mockInvoices = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  invoice_number: `INV-${String(i + 1).padStart(4, '0')}`,
  supplier_id: mockSuppliers[Math.floor(Math.random() * mockSuppliers.length)].id,
  purchase_order_id: mockPurchaseOrders[Math.floor(Math.random() * mockPurchaseOrders.length)].id,
  status: ['pending', 'confirmed', 'approved'][Math.floor(Math.random() * 3)],
  total_amount: Math.floor(Math.random() * 500000) + 5000,
  created_at: generateDate(),
  updated_at: generateDate(),
}));

const mockDashboardStats = {
  orders: {
    total: 1250,
    pending: 45,
    completed: 1180,
    cancelled: 25,
  },
  revenue: {
    total: 15750000,
    this_month: 2500000,
    last_month: 2200000,
    growth: 13.6,
  },
  products: {
    total: mockProducts.length,
    active: mockProducts.filter(p => p.status === 'active').length,
    low_stock: mockProducts.filter(p => p.quantity < p.min_reorder).length,
    expired: mockProducts.filter(p => new Date(p.expiry_date) < new Date()).length,
  },
  suppliers: {
    total: mockSuppliers.length,
    active: mockSuppliers.length - 2,
  }
};

// Pagination helper
const paginate = (data: any[], page: number = 1, perPage: number = 10) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = data.slice(start, end);
  
  return {
    data: paginatedData,
    current_page: page,
    per_page: perPage,
    total: data.length,
    last_page: Math.ceil(data.length / perPage),
    from: start + 1,
    to: Math.min(end, data.length),
    links: [], // Simplified for mock
  };
};

// Mock response helper
const createMockResponse = (data: any, status: number = 200): AxiosResponse => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {} as any,
});

// Mock API handlers
export const mockHandlers: Record<string, (config: AxiosRequestConfig) => Promise<AxiosResponse>> = {
  // Authentication
  'POST /login': async (config) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return createMockResponse({
      user: mockUsers[0],
      token: 'mock-jwt-token-' + Date.now(),
      message: 'Login successful'
    });
  },

  'GET /user': async () => {
    return createMockResponse({
      user: mockUsers[0]
    });
  },

  'GET /users/departments': async () => {
    return createMockResponse([
      { id: 1, name: 'Procurement', code: 'procurement' },
      { id: 2, name: 'Inventory', code: 'inventory' },
      { id: 3, name: 'Sales', code: 'sales' },
    ]);
  },

  'POST /logout': async () => {
    return createMockResponse({ message: 'Logged out successfully' });
  },

  // Branches
  'GET /branches': async (config) => {
    const params = config.params || {};
    if (params.type === 'all' || params.type === 'all^') {
      return createMockResponse({ data: mockBranches });
    }
    return createMockResponse(paginate(mockBranches, params.page, params.per_page));
  },

  // Dashboard
  'GET /dashboard_stats': async () => {
    return createMockResponse(mockDashboardStats);
  },

  // Products
  'GET /products': async (config) => {
    const params = config.params || {};
    let filteredProducts = [...mockProducts];
    
    if (params.searchTerm) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(params.searchTerm.toLowerCase())
      );
    }
    
    return createMockResponse(paginate(filteredProducts, params.page, params.perPage));
  },

  'GET /products/:id': async (config) => {
    const id = parseInt(config.url?.split('/').pop() || '1');
    const product = mockProducts.find(p => p.id === id);
    return createMockResponse(product || mockProducts[0]);
  },

  'POST /products': async (config) => {
    const newProduct = {
      id: generateId(),
      ...JSON.parse(config.data || '{}'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return createMockResponse(newProduct, 201);
  },

  'GET /search_products_typeahead': async (config) => {
    const params = config.params || {};
    const query = params.q || '';
    const filteredProducts = mockProducts
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
    return createMockResponse(filteredProducts);
  },

  // Categories
  'GET /categories': async (config) => {
    const params = config.params || {};
    if (params.all === '1') {
      return createMockResponse(mockCategories);
    }
    return createMockResponse(paginate(mockCategories, params.page, params.per_page));
  },

  'GET /browse/categories': async () => {
    return createMockResponse(mockCategories);
  },

  // Product Types
  'GET /product_types': async () => {
    return createMockResponse(mockProductTypes);
  },

  // Manufacturers
  'GET /manufacturers': async (config) => {
    const params = config.params || {};
    return createMockResponse(paginate(mockManufacturers, params.page, params.per_page));
  },

  'POST /manufacturers': async (config) => {
    const newManufacturer = {
      id: generateId(),
      ...JSON.parse(config.data || '{}'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockManufacturers.push(newManufacturer);
    return createMockResponse(newManufacturer, 201);
  },

  // Warehouses
  'GET /warehouses': async (config) => {
    const params = config.params || {};
    if (params.type === 'all') {
      return createMockResponse(mockWarehouses);
    }
    return createMockResponse(paginate(mockWarehouses, params.page, params.per_page));
  },

  // Shelves
  'GET /shelves': async (config) => {
    const params = config.params || {};
    if (params.type === 'all') {
      return createMockResponse(mockShelves);
    }
    return createMockResponse(paginate(mockShelves, params.page, params.per_page));
  },

  // Suppliers
  'GET /suppliers': async (config) => {
    const params = config.params || {};
    return createMockResponse(paginate(mockSuppliers, params.page, params.per_page));
  },

  'POST /suppliers': async (config) => {
    const newSupplier = {
      id: generateId(),
      ...JSON.parse(config.data || '{}'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockSuppliers.push(newSupplier);
    return createMockResponse(newSupplier, 201);
  },

  'PUT /suppliers/:id': async (config) => {
    const id = parseInt(config.url?.split('/')[2] || '1');
    const supplierIndex = mockSuppliers.findIndex(s => s.id === id);
    if (supplierIndex !== -1) {
      mockSuppliers[supplierIndex] = {
        ...mockSuppliers[supplierIndex],
        ...JSON.parse(config.data || '{}'),
        updated_at: new Date().toISOString(),
      };
      return createMockResponse(mockSuppliers[supplierIndex]);
    }
    return createMockResponse({ error: 'Supplier not found' }, 404);
  },

  // Purchase Orders
  'GET /purchase_orders': async (config) => {
    const params = config.params || {};
    return createMockResponse(paginate(mockPurchaseOrders, params.page, params.per_page));
  },

  'GET /purchase_orders/:id': async (config) => {
    const id = parseInt(config.url?.split('/')[2] || '1');
    const po = mockPurchaseOrders.find(p => p.id === id);
    return createMockResponse(po || mockPurchaseOrders[0]);
  },

  // Invoices
  'GET /invoices': async (config) => {
    const params = config.params || {};
    return createMockResponse(paginate(mockInvoices, params.page, params.per_page));
  },

  'GET /invoices/:id': async (config) => {
    const id = parseInt(config.url?.split('/')[2] || '1');
    const invoice = mockInvoices.find(i => i.id === id);
    return createMockResponse(invoice || mockInvoices[0]);
  },

  'POST /invoices': async (config) => {
    const newInvoice = {
      id: generateId(),
      ...JSON.parse(config.data || '{}'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockInvoices.push(newInvoice);
    return createMockResponse(newInvoice, 201);
  },

  'GET /invoices/inbound_types': async () => {
    return createMockResponse([
      { id: 1, name: 'Purchase Order', code: 'po' },
      { id: 2, name: 'Direct Purchase', code: 'direct' },
      { id: 3, name: 'Transfer', code: 'transfer' },
    ]);
  },

  // States (for address forms)
  'GET /states': async () => {
    return createMockResponse([
      { id: 1, name: 'Lagos', code: 'LA' },
      { id: 2, name: 'Abuja', code: 'AB' },
      { id: 3, name: 'Rivers', code: 'RI' },
      { id: 4, name: 'Kano', code: 'KN' },
    ]);
  },

  // Password reset endpoints
  'POST /password/forgot': async (config) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return createMockResponse({ 
      message: 'OTP sent to your phone',
      success: true 
    });
  },

  'POST /password/reset': async (config) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return createMockResponse({ 
      message: 'Password reset successful',
      success: true 
    });
  },

  // Customer Success / Sales endpoints
  'GET /customers': async (config) => {
    const params = config.params || {};
    const mockCustomers = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `080${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
      address: `${i + 1} Customer Street, Lagos`,
      total_orders: Math.floor(Math.random() * 50) + 1,
      total_spent: Math.floor(Math.random() * 500000) + 10000,
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      created_at: generateDate(),
      updated_at: generateDate(),
    }));
    return createMockResponse(paginate(mockCustomers, params.page, params.perPage));
  },

  'GET /orders': async (config) => {
    const params = config.params || {};
    const mockOrders = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      order_number: `ORD-${String(i + 1).padStart(4, '0')}`,
      customer_id: Math.floor(Math.random() * 30) + 1,
      customer_name: `Customer ${Math.floor(Math.random() * 30) + 1}`,
      total_amount: Math.floor(Math.random() * 100000) + 5000,
      status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)],
      created_at: generateDate(),
      updated_at: generateDate(),
    }));
    return createMockResponse(paginate(mockOrders, params.page, params.perPage));
  },

  // Additional inventory endpoints
  'GET /admin/products': async (config) => {
    const params = config.params || {};
    return createMockResponse(paginate(mockProducts, params.page, params.perPage));
  },

  'GET /product_batches': async (config) => {
    const params = config.params || {};
    const mockBatches = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      batch_number: `BATCH-${String(i + 1).padStart(4, '0')}`,
      product_id: mockProducts[Math.floor(Math.random() * mockProducts.length)].id,
      quantity: Math.floor(Math.random() * 1000) + 100,
      expiry_date: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      created_at: generateDate(),
      updated_at: generateDate(),
    }));
    return createMockResponse(paginate(mockBatches, params.page, params.perPage));
  },

  // Procurement Stats (specific for procurement dashboard)
  'GET /procurement_stats': async () => {
    return createMockResponse({
      receivedSuppliers: { value: 45, change: 12.5 },
      receivedProductsQty: { value: 2340, change: 8.3 },
      valueReceivedProducts: { value: 15750000, change: 15.2 },
      ordersPendingArrival: { value: 23 },
      ordersPassedDelivery: { value: 5 },
      avgProcessingTime: { value: "2d | 4h | 30m" },
      shelfLifeAnalysis: { less_than_18_months: 35, others: 65 },
      storageSpace: { used: 78, free: 22 },
      topSuppliers: [
        { name: "Supplier 1", value: 2500000 },
        { name: "Supplier 2", value: 1800000 },
        { name: "Supplier 3", value: 1200000 },
        { name: "Supplier 4", value: 950000 },
        { name: "Supplier 5", value: 750000 },
      ],
      topProducts: [
        { name: "Product 1", value: 450 },
        { name: "Product 2", value: 380 },
        { name: "Product 3", value: 320 },
        { name: "Product 4", value: 280 },
        { name: "Product 5", value: 220 },
      ],
    });
  },

  // Notifications
  'GET /notifications': async () => {
    return createMockResponse({
      data: [
        {
          id: 1,
          name: "Supplier 1",
          contact_name: "John Doe",
          message: "New order received",
          type: "order",
          read: false,
          created_at: generateDate(),
        },
        {
          id: 2,
          name: "Supplier 2", 
          contact_name: "Jane Smith",
          message: "Payment processed",
          type: "payment",
          read: false,
          created_at: generateDate(),
        },
        {
          id: 3,
          name: "Supplier 3",
          contact_name: "Bob Wilson",
          message: "Delivery scheduled",
          type: "delivery",
          read: true,
          created_at: generateDate(),
        },
      ]
    });
  },

  // Generic fallback for unhandled routes
  'DEFAULT': async () => {
    return createMockResponse({ message: 'Mock endpoint not implemented' }, 404);
  },
};

// Mock interceptor function
export const mockApiCall = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  if (!MOCK_ENABLED) {
    throw new Error('Mock not enabled');
  }

  const method = config.method?.toUpperCase() || 'GET';
  const url = config.url || '';
  
  // Clean URL (remove query params and base URL)
  const cleanUrl = url.replace(/\?.*$/, '').replace(/^.*\/api/, '');
  
  // Create handler key
  const handlerKey = `${method} ${cleanUrl}`;
  
  // Try exact match first
  let handler = mockHandlers[handlerKey];
  
  // Try pattern matching for dynamic routes
  if (!handler) {
    for (const [pattern, handlerFn] of Object.entries(mockHandlers)) {
      const [patternMethod, patternUrl] = pattern.split(' ');
      if (patternMethod === method && patternUrl.includes(':')) {
        const regex = new RegExp('^' + patternUrl.replace(/:\w+/g, '\\d+') + '$');
        if (regex.test(cleanUrl)) {
          handler = handlerFn;
          break;
        }
      }
    }
  }
  
  // Use default handler if no match
  if (!handler) {
    handler = mockHandlers['DEFAULT'];
  }
  
  console.log(`🎭 Mock API: ${method} ${cleanUrl}`);
  return handler(config);
}; 