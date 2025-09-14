import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

// Base URL는 환경변수에서 받아오고, /api/v1를 접미사로 고정합니다.
// 예: VITE_API_BASE_URL=https://spotinu-server.inuappcenter.kr
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
