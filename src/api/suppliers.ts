import api from './index'

export interface Supplier {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact_person: string;
  bank_name?: string;
  account_number?: string;
}

export const getSuppliers = (params?: any) => 
  api.get('/suppliers', { params })

export const getSupplier = (id: number) => 
  api.get(`/suppliers/${id}`)

export const createSupplier = (data: Supplier, currentBranch?: number) => 
  api.post(`/suppliers?current_branch=${currentBranch || 1}`, data)

export const updateSupplier = (id: number, data: Supplier, currentBranch?: number) => 
  api.put(`/suppliers/${id}?current_branch=${currentBranch || 1}`, data)

export const deleteSupplier = (id: number) => 
  api.delete(`/suppliers/${id}`)

export const mergeSuppliers = (data: any, currentBranch?: number) => 
  api.post(`/suppliers/merge?current_branch=${currentBranch || 1}`, data) 