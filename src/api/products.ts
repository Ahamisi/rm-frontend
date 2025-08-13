// resources/vue3/api/products.ts
import api from './index'

export const getProducts = (params?: any) => api.get('/products', { params })

export const getProduct = (id: number) => api.get(`/products/${id}`)

export const createProduct = (data: any) => api.post('/products', data)

export const updateProduct = (id: number, data: any) => api.put(`/products/${id}`, data)

export const deleteProduct = (id: number) => api.delete(`/products/${id}`)

export const searchProducts = (query: string, fields?: string) => 
  api.get('/search_products_typeahead', { 
    params: { q: query, fields: fields || 'id,name,price_per_pack,unit_cost,min_reorder' } 
  })

// Additional product-related endpoints
export const getProductCategories = () => api.get('/categories')

export const getProductTypes = () => api.get('/product_types')

export const getManufacturers = () => api.get('/manufacturers')

export const getWarehouses = () => api.get('/warehouses', { params: { type: 'all' } })

export const getShelves = () => api.get('/shelves', { params: { type: 'all' } })
