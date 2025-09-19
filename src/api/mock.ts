// Mock API System for Frontend Development
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Enable/disable mocking
export const MOCK_ENABLED = true; // Temporarily enabled for demo data

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
      { id: 1, name: 'Procurement', code: 'procurement', icon: '@/views/Pages/procurement/redesign/ProcurementIcon.svg' },
      { id: 2, name: 'Inventory', code: 'inventory', icon: '@/views/Pages/procurement/redesign/ProcurementIcon.svg' },
      { id: 3, name: 'Sales', code: 'sales', icon: '@/views/Pages/procurement/redesign/CustomerSuccessIcon.svg' },
      { id: 4, name: 'Inbound', code: 'inbound', icon: '@/views/Pages/procurement/redesign/InboundIcon.svg' },
      { id: 5, name: 'Outbound', code: 'outbound', icon: '@/views/Pages/procurement/redesign/OutboundIcon.svg' },
      { id: 6, name: 'Compliance', code: 'compliance', icon: '@/views/Pages/procurement/redesign/ComplianceIcon.svg' },
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

  // Compliance Dashboard
  'GET /compliance/dashboard/stats': async () => {
    return createMockResponse({
      total_audits: 1250,
      pending_audits: 45,
      completed_audits: 1205,
      compliance_rate: 96.4,
    });
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

  // Outbound Dashboard - Fulfillment Stats
  'GET /outbound/fulfillment/stats': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/fulfillment/stats - Received params:', params);
    
    const mockFulfillmentStats = [
      {
        id: 1,
        agent_name: 'Esther Joel',
        check_in_time: '08:30:00',
        check_out_time: '17:00:00',
        orders_count: 25,
        items_count: 450,
        productivity_score: 92,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Lagos Warehouse'
      },
      {
        id: 2,
        agent_name: 'Josh Michael',
        check_in_time: '09:00:00',
        check_out_time: '18:00:00',
        orders_count: 30,
        items_count: 520,
        productivity_score: 93,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Lagos Warehouse'
      },
      {
        id: 3,
        agent_name: 'Sarah Badmus',
        check_in_time: '08:00:00',
        check_out_time: '16:30:00',
        orders_count: 22,
        items_count: 380,
        productivity_score: 91,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Abuja Warehouse'
      },
      {
        id: 4,
        agent_name: 'Adebayo Ogundimu',
        check_in_time: '07:30:00',
        check_out_time: '16:00:00',
        orders_count: 18,
        items_count: 320,
        productivity_score: 94,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Lagos Warehouse'
      },
      {
        id: 5,
        agent_name: 'Funmi Adebayo',
        check_in_time: '09:30:00',
        check_out_time: '18:30:00',
        orders_count: 27,
        items_count: 480,
        productivity_score: 93,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Port Harcourt Warehouse'
      },
      {
        id: 6,
        agent_name: 'Kemi Olatunji',
        check_in_time: '08:15:00',
        check_out_time: '17:15:00',
        orders_count: 24,
        items_count: 410,
        productivity_score: 92,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Lagos Warehouse'
      },
      {
        id: 7,
        agent_name: 'David Okoro',
        check_in_time: '10:00:00',
        check_out_time: '19:00:00',
        orders_count: 20,
        items_count: 350,
        productivity_score: 95,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Abuja Warehouse'
      },
      {
        id: 8,
        agent_name: 'Grace Nwosu',
        check_in_time: '08:45:00',
        check_out_time: '17:45:00',
        orders_count: 26,
        items_count: 460,
        productivity_score: 92,
        status: 'Active',
        shift_date: '2024-01-16',
        department: 'Outbound',
        location: 'Lagos Warehouse'
      }
    ];

    // Apply search filter
    let filteredStats = [...mockFulfillmentStats];
    if (params.searchTerm || params.search) {
      const searchTerm = (params.searchTerm || params.search).toLowerCase();
      filteredStats = filteredStats.filter(stat => 
        stat.agent_name.toLowerCase().includes(searchTerm) ||
        stat.location.toLowerCase().includes(searchTerm) ||
        stat.status.toLowerCase().includes(searchTerm)
      );
    }

    // Apply date filters
    if (params.from_date && params.to_date) {
      filteredStats = filteredStats.filter(stat => 
        stat.shift_date >= params.from_date && stat.shift_date <= params.to_date
      );
    }

    // Apply additional filters
    if (params.filter) {
      const filter = typeof params.filter === 'string' ? JSON.parse(params.filter) : params.filter;
      if (filter.location) {
        filteredStats = filteredStats.filter(stat => stat.location === filter.location);
      }
      if (filter.status) {
        filteredStats = filteredStats.filter(stat => stat.status === filter.status);
      }
    }

    const result = paginate(filteredStats, params.page, params.perPage);
    console.log('🎭 Mock API: GET /outbound/fulfillment/stats - Returning data:', result);
    return createMockResponse(result);
  },

  // Outbound Dashboard Stats
  'GET /outbound/dashboard/stats': async () => {
    return createMockResponse({
      total_orders: 1250,
      pending_orders: 45,
      completed_orders: 1180,
      cancelled_orders: 25,
      active_agents: 8,
      total_items_processed: 3370,
      average_efficiency: '92.8%',
      warehouses_active: 3,
      daily_target: 1500,
      daily_completed: 1180,
      completion_rate: '78.7%'
    });
  },

  // Outbound Log Books
  'GET /outbound/log-books': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/log-books - Received params:', params);
    
    const mockLogBooks = [
      {
        id: 1,
        driver_name: 'Janet Adeajayi',
        order_count: 15,
        state: 'Lagos State',
        delivery_timeline: '16/01/2025 - 16:34:54s',
        vehicle_reg_no: 'LAG-123-ABC',
        created_at: '2025-01-16T16:34:54Z',
        updated_at: '2025-01-16T16:34:54Z',
        customers: [
          {
            id: 1,
            order_number: 'ORD-2025-001',
            customer_name: 'Emeka Pharmacy',
            package_type: 'Standard Box',
            quantity: 25,
            warehouse_rep_signoff: 'John Doe',
            logistics_rep_signoff: 'Jane Smith',
            vehicle_reg_no: 'LAG-123-ABC'
          },
          {
            id: 2,
            order_number: 'ORD-2025-002',
            customer_name: 'Mercy Medical Store',
            package_type: 'Cold Chain',
            quantity: 12,
            warehouse_rep_signoff: 'John Doe',
            logistics_rep_signoff: 'Jane Smith',
            vehicle_reg_no: 'LAG-123-ABC'
          }
        ]
      },
      {
        id: 2,
        driver_name: 'Chike Okafor',
        order_count: 22,
        state: 'Abuja FCT',
        delivery_timeline: '16/01/2025 - 14:20:30s',
        vehicle_reg_no: 'ABJ-456-DEF',
        created_at: '2025-01-16T14:20:30Z',
        updated_at: '2025-01-16T14:20:30Z',
        customers: [
          {
            id: 3,
            order_number: 'ORD-2025-003',
            customer_name: 'Capital Health Pharmacy',
            package_type: 'Standard Box',
            quantity: 18,
            warehouse_rep_signoff: 'Mary Johnson',
            logistics_rep_signoff: 'David Wilson',
            vehicle_reg_no: 'ABJ-456-DEF'
          }
        ]
      },
      {
        id: 3,
        driver_name: 'Adunni Lawal',
        order_count: 8,
        state: 'Ogun State',
        delivery_timeline: '16/01/2025 - 12:15:45s',
        vehicle_reg_no: 'OGN-789-GHI',
        created_at: '2025-01-16T12:15:45Z',
        updated_at: '2025-01-16T12:15:45Z',
        customers: [
          {
            id: 4,
            order_number: 'ORD-2025-004',
            customer_name: 'Gateway Medical Centre',
            package_type: 'Fragile',
            quantity: 5,
            warehouse_rep_signoff: 'Peter Brown',
            logistics_rep_signoff: 'Sarah Davis',
            vehicle_reg_no: 'OGN-789-GHI'
          }
        ]
      },
      {
        id: 4,
        driver_name: 'Tunde Bakare',
        order_count: 31,
        state: 'Rivers State',
        delivery_timeline: '16/01/2025 - 10:45:12s',
        vehicle_reg_no: 'RIV-321-JKL',
        created_at: '2025-01-16T10:45:12Z',
        updated_at: '2025-01-16T10:45:12Z',
        customers: [
          {
            id: 5,
            order_number: 'ORD-2025-005',
            customer_name: 'Port Harcourt General Hospital',
            package_type: 'Bulk Order',
            quantity: 45,
            warehouse_rep_signoff: 'Michael Green',
            logistics_rep_signoff: 'Lisa White',
            vehicle_reg_no: 'RIV-321-JKL'
          }
        ]
      },
      {
        id: 5,
        driver_name: 'Kemi Adebayo',
        order_count: 19,
        state: 'Kano State',
        delivery_timeline: '16/01/2025 - 09:30:25s',
        vehicle_reg_no: 'KAN-654-MNO',
        created_at: '2025-01-16T09:30:25Z',
        updated_at: '2025-01-16T09:30:25Z',
        customers: [
          {
            id: 6,
            order_number: 'ORD-2025-006',
            customer_name: 'Northern Pharmacy Ltd',
            package_type: 'Standard Box',
            quantity: 28,
            warehouse_rep_signoff: 'Ahmed Hassan',
            logistics_rep_signoff: 'Fatima Ali',
            vehicle_reg_no: 'KAN-654-MNO'
          }
        ]
      }
    ];

    // Apply search filter
    let filteredLogBooks = [...mockLogBooks];
    if (params.searchTerm || params.search) {
      const searchTerm = (params.searchTerm || params.search).toLowerCase();
      filteredLogBooks = filteredLogBooks.filter(logBook => 
        logBook.driver_name.toLowerCase().includes(searchTerm) ||
        logBook.state.toLowerCase().includes(searchTerm) ||
        logBook.vehicle_reg_no.toLowerCase().includes(searchTerm)
      );
    }

    // Apply date filters
    if (params.from_date && params.to_date) {
      filteredLogBooks = filteredLogBooks.filter(logBook => 
        logBook.created_at >= params.from_date && logBook.created_at <= params.to_date
      );
    }

    const result = paginate(filteredLogBooks, params.page, params.perPage);
    console.log('🎭 Mock API: GET /outbound/log-books - Returning data:', result);
    return createMockResponse(result);
  },

  // Outbound Stock Count
  'GET /outbound/stock-count': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/stock-count - Received params:', params);
    
    const mockStockCount = [
      {
        id: 1,
        product_name: 'Paracetamol 500mg',
        batch_number: 'BATCH-001',
        expected_quantity: 500,
        actual_quantity: 498,
        variance: -2,
        status: 'Discrepancy',
        shelf_location: 'A1-B2',
        counted_by: 'John Doe',
        counted_at: '2025-01-16T14:30:00Z'
      },
      {
        id: 2,
        product_name: 'Amoxicillin 250mg',
        batch_number: 'BATCH-002',
        expected_quantity: 300,
        actual_quantity: 300,
        variance: 0,
        status: 'Match',
        shelf_location: 'A2-C1',
        counted_by: 'Jane Smith',
        counted_at: '2025-01-16T14:35:00Z'
      },
      {
        id: 3,
        product_name: 'Ibuprofen 400mg',
        batch_number: 'BATCH-003',
        expected_quantity: 250,
        actual_quantity: 255,
        variance: 5,
        status: 'Surplus',
        shelf_location: 'B1-A3',
        counted_by: 'Mike Johnson',
        counted_at: '2025-01-16T14:40:00Z'
      }
    ];

    const result = paginate(mockStockCount, params.page, params.perPage);
    return createMockResponse(result);
  },

  // Outbound Picking Lists
  'GET /outbound/picking-lists': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/picking-lists - Received params:', params);
    
    const mockPickingLists = [
      {
        id: 1,
        order_ref: 'ORD-2025-001',
        customer_name: 'Emeka Pharmacy',
        status: 'In Progress',
        assigned_to: 'Esther Joel',
        created_at: '2025-01-16T10:00:00Z',
        items: [
          {
            id: 1,
            sn: 1,
            product_name: 'Paracetamol 500mg',
            batch_number: 'BATCH-001',
            quantity_required: 50,
            quantity_picked: 0,
            shelf_location: 'A1-B2',
            scan: 'Scan',
            status: 'Pending'
          },
          {
            id: 2,
            sn: 2,
            product_name: 'Amoxicillin 250mg',
            batch_number: 'BATCH-002',
            quantity_required: 30,
            quantity_picked: 0,
            shelf_location: 'A2-C1',
            scan: 'Scan',
            status: 'Pending'
          }
        ]
      }
    ];

    const result = paginate(mockPickingLists, params.page, params.perPage);
    return createMockResponse(result);
  },

  // Outbound Check-in/Check-out
  'POST /outbound/check-in': async (config) => {
    console.log('🎭 Mock API: POST /outbound/check-in - Received data:', config.data);
    return createMockResponse({
      message: 'Successfully checked in',
      check_in_time: new Date().toISOString(),
      agent_name: 'Current User'
    });
  },

  'POST /outbound/check-out': async (config) => {
    console.log('🎭 Mock API: POST /outbound/check-out - Received data:', config.data);
    return createMockResponse({
      message: 'Successfully checked out',
      check_out_time: new Date().toISOString(),
      agent_name: 'Current User'
    });
  },

  // Outbound Teams
  'GET /outbound/teams': async (config) => {
    const params = config.params || {};
    const mockTeams = [
      {
        id: 1,
        name: 'Team Alpha',
        leader: 'John Doe',
        members: ['Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
        status: 'Active',
        current_task: 'Stock Count - Warehouse A',
        created_at: '2025-01-15T08:00:00Z'
      },
      {
        id: 2,
        name: 'Team Beta',
        leader: 'David Brown',
        members: ['Lisa Davis', 'Tom Wilson', 'Anna Taylor'],
        status: 'Active',
        current_task: 'Order Fulfillment - Zone B',
        created_at: '2025-01-15T08:00:00Z'
      }
    ];

    const result = paginate(mockTeams, params.page, params.perPage);
    return createMockResponse(result);
  },

  // Outbound orders
'GET /outbound/orders': async (config) => {
  const params = config.params || {};
  console.log('🎭 Mock API: GET /outbound/orders - Received params:', params);
  let mockOrders = [
    {
      id: 1,
      order_no: 'RHPO-1651244214',
      customer_name: 'Fidson Healthcare',
      store_name: 'Emeka Pharmacy',
      state: 'Lagos',
      payment: 'Trade',
      processing_date: '5/21/2024',
      delivery_date: '5/21/2024',
      total_amount: '₦2,055,043.00',
      tags: ['Cash and Carry', 'Controlled', 'Hospital'],
      assigned: 'Esther Joel',
      assigned_avatar: '/avatarImage.png'
    },
    {
      id: 2,
      order_no: 'RHPO-1651244214',
      customer_name: 'Fidson Healthcare',
      store_name: 'Emeka Pharmacy',
      state: 'Lagos',
      payment: 'Trade',
      processing_date: '5/21/2024',
      delivery_date: '5/21/2024',
      total_amount: '₦2,055,043.00',
      tags: ['Controlled', 'Hospital'],
      assigned: 'Unassigned',
      assigned_avatar: ''
    },
    {
      id: 3,
      order_no: 'RHPO-1651244214',
      customer_name: 'EVANS THERAPEUTICS LIMITED',
      store_name: 'Emeka Pharmacy',
      state: 'Lagos',
      payment: 'Trade',
      processing_date: '5/21/2024',
      delivery_date: '5/21/2024',
      total_amount: '₦2,055,043.00',
      tags: ['Cash and Carry', 'Controlled'],
      assigned: 'Esther Joel',
      assigned_avatar: '/avatarImage.png'
    },
    {
      id: 4,
      order_no: 'RHPO-1651244217',
      customer_name: 'Fidson Healthcare',
      store_name: 'Xela Pharmacy',
      state: 'Ogun',
      payment: 'Cash',
      order_date: '2024-05-18',
      delivery_date: '2024-05-20',
      total_amount: 980000.00,
      tags: ['Cash and Carry', 'Controlled'],
      assigned: 'Sarah Badmus'
    },
    {
      id: 5,
      order_no: 'RHPO-1651244218',
      customer_name: 'May & Baker Nigeria',
      store_name: 'MedPlus Pharmacy',
      state: 'Rivers',
      payment: 'Trade',
      order_date: '2024-05-17',
      delivery_date: '2024-05-19',
      total_amount: 1750000.00,
      tags: ['Cash and Carry', 'Hospital'],
      assigned: 'Josh Michael'
    },
    {
      id: 6,
      order_no: 'RHPO-1651244219',
      customer_name: 'GSK Consumer Nigeria',
      store_name: 'HealthFirst Pharmacy',
      state: 'Kano',
      payment: 'Credit',
      order_date: '2024-05-16',
      delivery_date: '2024-05-18',
      total_amount: 2800000.00,
      tags: ['Cash and Carry'],
      assigned: null
    },
    {
      id: 7,
      order_no: 'RHPO-1651244220',
      customer_name: 'Pfizer Consumer Healthcare',
      store_name: 'WellCare Pharmacy',
      state: 'Kaduna',
      payment: 'Trade',
      order_date: '2024-05-15',
      delivery_date: '2024-05-17',
      total_amount: 1450000.00,
      tags: ['Controlled', 'Hospital'],
      assigned: 'Adebayo Ogundimu'
    },
    {
      id: 8,
      order_no: 'RHPO-1651244221',
      customer_name: 'Chi Pharmaceuticals',
      store_name: 'Alpha Pharmacy',
      state: 'Anambra',
      payment: 'Cash',
      order_date: '2024-05-14',
      delivery_date: '2024-05-16',
      total_amount: 890000.00,
      tags: ['Cash and Carry', 'Controlled'],
      assigned: 'Funmi Adebayo'
    },
    {
      id: 9,
      order_no: 'RHPO-1651244222',
      customer_name: 'Neimeth International',
      store_name: 'CityMed Pharmacy',
      state: 'Oyo',
      payment: 'Trade',
      order_date: '2024-05-13',
      delivery_date: '2024-05-15',
      total_amount: 2100000.00,
      tags: ['Hospital'],
      assigned: 'Kemi Olatunji'
    },
    {
      id: 10,
      order_no: 'RHPO-1651244223',
      customer_name: 'Juhel Nigeria Limited',
      store_name: 'Premier Pharmacy',
      state: 'Delta',
      payment: 'Credit',
      order_date: '2024-05-12',
      delivery_date: '2024-05-14',
      total_amount: 1680000.00,
      tags: ['Cash and Carry', 'Controlled', 'Hospital'],
      assigned: null
    }
  ];

  // Apply search filter
  if (params.searchTerm || params.search) {
    const searchTerm = (params.searchTerm || params.search).toLowerCase();
    const searchBy = params.search_by;
    
    mockOrders = mockOrders.filter(order => {
      if (searchBy === 'order') {
        return order.order_no.toLowerCase().includes(searchTerm);
      } else if (searchBy === 'customer') {
        return order.customer_name.toLowerCase().includes(searchTerm);
      } else if (searchBy === 'store') {
        return order.store_name.toLowerCase().includes(searchTerm);
      } else {
        // Default search across all fields
        return order.order_no.toLowerCase().includes(searchTerm) ||
               order.customer_name.toLowerCase().includes(searchTerm) ||
               order.store_name.toLowerCase().includes(searchTerm) ||
               order.state.toLowerCase().includes(searchTerm) ||
               order.payment.toLowerCase().includes(searchTerm) ||
               (order.assigned && order.assigned.toLowerCase().includes(searchTerm));
      }
    });
  }

  // Apply date filters
  if (params.from_date) {
    mockOrders = mockOrders.filter(order => order.order_date >= params.from_date);
  }
  if (params.to_date) {
    mockOrders = mockOrders.filter(order => order.order_date <= params.to_date);
  }

  // Apply additional filters
  if (params.filter) {
    if (params.filter.state) {
      mockOrders = mockOrders.filter(order => order.state === params.filter.state);
    }
    if (params.filter.payment) {
      mockOrders = mockOrders.filter(order => order.payment === params.filter.payment);
    }
  }

  // Apply sorting
  if (params.sort_by || (params.sort && params.sort.field)) {
    const sortField = params.sort_by || params.sort.field;
    const sortOrder = params.sort_order || (params.sort && params.sort.type) || 'asc';
    
    mockOrders.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      // Handle different data types
      if (sortField === 'total_amount') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else if (sortField === 'order_date' || sortField === 'delivery_date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      } else {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      }
    });
  }

  const result = paginate(mockOrders, params.page, params.perPage);
  console.log('🎭 Mock API: GET /outbound/orders - Returning data:', result);
  return createMockResponse(result);
},

  // Outbound log books
  'GET /outbound/log-books': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/log-books - Received params:', params);
    
    let mockLogBooks = [
      {
        id: 15,
        driver_name: 'Oluwatosin Adegboye',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 14,
        driver_name: 'Janet Adeajayi',
        order_count: 1,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 13,
        driver_name: 'Henry Christopher',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 12,
        driver_name: 'Oluwatosin Adegboye',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 11,
        driver_name: 'Janet Adeajayi',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 10,
        driver_name: 'Henry Christopher',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 9,
        driver_name: 'Oluwatosin Adegboye',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 8,
        driver_name: 'Janet Adeajayi',
        order_count: 1,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 7,
        driver_name: 'Henry Christopher',
        order_count: 0,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      },
      {
        id: 6,
        driver_name: 'Oluwatosin Adegboye',
        order_count: 1,
        state: 'Lagos',
        delivery_timeline: '16/01/2025 - 16:34:54s'
      }
    ];

    // Apply filters
    if (params.searchTerm || params.search) {
      const searchTerm = (params.searchTerm || params.search).toLowerCase();
      mockLogBooks = mockLogBooks.filter(logBook => 
        logBook.driver_name.toLowerCase().includes(searchTerm) ||
        logBook.state.toLowerCase().includes(searchTerm)
      );
    }

    if (params.from_date && params.to_date) {
      // Filter by date range if needed
    }

    if (params.filter) {
      const filter = typeof params.filter === 'string' ? JSON.parse(params.filter) : params.filter;
      if (filter.state) {
        mockLogBooks = mockLogBooks.filter(logBook => logBook.state === filter.state);
      }
    }

    // Apply sorting
    if (params.sort_by) {
      const sortField = params.sort_by;
      const sortOrder = params.sort_order || 'asc';
      mockLogBooks.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    const result = paginate(mockLogBooks, params.page, params.perPage);
    console.log('🎭 Mock API: GET /outbound/log-books - Returning data:', result);
    return createMockResponse(result);
  },

  // Log book orders endpoint for edit page
  'GET /outbound/log-books/:id/orders': async (config) => {
    const params = config.params || {};
    console.log('🎭 Mock API: GET /outbound/log-books/:id/orders - Received params:', params);
    
    const mockOrders = [
      {
        id: 1,
        order_number: 'REF: 1656493689-254',
        customer_name: 'Janet Adeajayi',
        store_name: 'Emeka Pharmacy',
        driver_name: 'Oluwatosin Adegboye',
        package_type: 'None',
        quantity: 71,
        warehouse_rep_sign_off: '--',
        logistics_rep_sign_off: '--',
        vehicle_reg_no: '--'
      },
      {
        id: 2,
        order_number: 'REF: 1656493689-254',
        customer_name: 'Janet Adeajayi',
        store_name: 'Emeka Pharmacy',
        driver_name: 'Oluwatosin Adegboye',
        package_type: 'None',
        quantity: 59,
        warehouse_rep_sign_off: '--',
        logistics_rep_sign_off: '--',
        vehicle_reg_no: '--'
      },
      {
        id: 3,
        order_number: 'REF: 1656493689-254',
        customer_name: 'Janet Adeajayi',
        store_name: 'Emeka Pharmacy',
        driver_name: 'No Driver Assigned',
        package_type: 'None',
        quantity: 70,
        warehouse_rep_sign_off: '--',
        logistics_rep_sign_off: '--',
        vehicle_reg_no: '--'
      }
    ];

    const result = {
      data: mockOrders,
      meta: {
        current_page: 1,
        per_page: 10,
        total: mockOrders.length,
        last_page: 1
      }
    };

    console.log('🎭 Mock API: GET /outbound/log-books/:id/orders - Returning data:', result);
    return createMockResponse(result);
  },

  // Stock Count Teams
  'GET /outbound/stock-count/teams': async (config: AxiosRequestConfig) => {
    console.log('🎭 Mock API: GET /outbound/stock-count/teams - CALLED!');
    
    const params = parseQueryParams(config.url || '');
    
    const mockTeams = [
      {
        id: 15,
        name: 'Team A (Azeez)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 14,
        name: 'Team B (David)',
        users: 4,
        shelves: 2,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 13,
        name: 'Team C (Sam)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 12,
        name: 'Team D (Osas)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 11,
        name: 'Team E (Bruno)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 10,
        name: 'Team F (Ade)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 9,
        name: 'Team E (Stella)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 8,
        name: 'Team F (Tunji)',
        users: 1,
        shelves: 1,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 7,
        name: 'Team G (Mariam)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 6,
        name: 'Team H (Dale)',
        users: 1,
        shelves: 1,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 5,
        name: 'Team I (Joseph)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 4,
        name: 'Team J (Harrison)',
        users: 1,
        shelves: 1,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 3,
        name: 'Team K (Chukwudi)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 2,
        name: 'Team L (Victor)',
        users: 1,
        shelves: 1,
        created_at: generateDate(),
        updated_at: generateDate(),
      },
      {
        id: 1,
        name: 'Team M (Emmanuel)',
        users: 0,
        shelves: 0,
        created_at: generateDate(),
        updated_at: generateDate(),
      }
    ];

    const result = paginate(mockTeams, params.page, params.perPage);
    
    console.log('🎭 Mock API: GET /outbound/stock-count/teams - Returning data:', result);
    return createMockResponse(result);
  },

  // Stock Count Teams with /v1 prefix
  'GET /v1/outbound/stock-count/teams': async (config: AxiosRequestConfig) => {
    console.log('🎭 Mock API: GET /v1/outbound/stock-count/teams - CALLED!');
    // Redirect to main handler
    return mockHandlers['GET /outbound/stock-count/teams'](config);
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
  let cleanUrl = url.replace(/\?.*$/, '').replace(/^.*\/api/, '');
  // Also remove /v1 prefix if present
  cleanUrl = cleanUrl.replace(/^\/v1/, '');
  
  // Create handler key
  const handlerKey = `${method} ${cleanUrl}`;
  
  console.log(`🎭 Mock API Debug: Original URL: ${url}`);
  console.log(`🎭 Mock API Debug: Clean URL: ${cleanUrl}`);
  console.log(`🎭 Mock API Debug: Handler Key: ${handlerKey}`);
  
  // Special debug for stock count teams
  if (cleanUrl.includes('stock-count') || url.includes('stock-count')) {
    console.log('🎯🎯🎯 STOCK COUNT TEAMS URL DETECTED! 🎯🎯🎯');
    console.log('🎯 Original URL:', url);
    console.log('🎯 Clean URL:', cleanUrl);
    console.log('🎯 Handler Key:', handlerKey);
  }
  
  console.log(`🎭 Mock API Debug: Available handlers:`, Object.keys(mockHandlers));
  
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