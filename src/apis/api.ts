import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

const base = (import.meta.env.VITE_API_BASE_URL as string | undefined) || ''
export const api = axios.create({
  baseURL: base.replace(/\/$/, '') + '/api/v1',
  withCredentials: true,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
