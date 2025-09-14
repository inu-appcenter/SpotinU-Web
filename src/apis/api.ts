import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// 환경변수 기반 base URL + /api/v1 접미사 고정
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
