import api from './index'

export interface DashboardStatsParams {
  from_date?: string;
  to_date?: string;
  branch?: number;
  type?: string;
}

export const getDashboardStats = (params: DashboardStatsParams = {}) => 
  api.get('/dashboard_stats', { 
    params: {
      current_branch: 1,
      ...params
    }
  })

export const getBranches = (params?: any) => 
  api.get('/branches', { params })

export const getBranch = (id: number) => 
  api.get(`/branches/${id}`)

export const createBranch = (data: any) => 
  api.post('/branches', data)

export const updateBranch = (id: number, data: any) => 
  api.put(`/branches/${id}`, data)

export const getStates = () => 
  api.get('/states') 