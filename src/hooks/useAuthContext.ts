import { useContext } from 'react'

import { AuthContext } from '@/contexts/AuthContext'

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthProvider로 앱을 감싸야 합니다.')
  return ctx
}
