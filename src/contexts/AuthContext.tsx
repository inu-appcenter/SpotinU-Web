// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  studentNumber: string | null
  setAuth: (token: string | null, studentNumber: string | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [studentNumber, setStudentNumber] = useState<string | null>(null)

  // 시작 시 localStorage 값 불러오기
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedStudentNumber = localStorage.getItem('studentNumber')
    setToken(storedToken)
    setStudentNumber(storedStudentNumber)
  }, [])

  const setAuth = (newToken: string | null, newStudentNumber: string | null) => {
    if (newToken && newStudentNumber) {
      localStorage.setItem('accessToken', newToken)
      localStorage.setItem('studentNumber', newStudentNumber)
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('studentNumber')
    }
    setToken(newToken)
    setStudentNumber(newStudentNumber)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        studentNumber,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthProvider로 앱을 감싸야 합니다.')
  return ctx
}
