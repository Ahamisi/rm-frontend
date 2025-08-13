import api from './index'

export interface LoginCredentials {
  phone: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordData {
  phone: string;
}

export interface ResetPasswordData {
  phone: string;
  code: string;
  password: string;
}

export const login = (credentials: LoginCredentials) => 
  api.post('/login', credentials)

export const logout = () => 
  api.post('/logout')

export const getUser = () => 
  api.get('/user')

export const getUserDepartments = () => 
  api.get('/users/departments')

export const forgotPassword = (data: ForgotPasswordData) => 
  api.post('/password/forgot', data)

export const resetPassword = (data: ResetPasswordData) => 
  api.post('/password/reset', data) 