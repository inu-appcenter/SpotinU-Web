import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthState = {
  accessToken: string | null
  studentNumber: string | null
  isAuthenticated: boolean
  setAuth: (token: string | null, studentNumber: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      studentNumber: null,
      isAuthenticated: false,
      setAuth: (token, studentNumber) =>
        set(() => ({ accessToken: token, studentNumber, isAuthenticated: !!token })),
      logout: () => set(() => ({ accessToken: null, studentNumber: null, isAuthenticated: false })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken, studentNumber: state.studentNumber, isAuthenticated: state.isAuthenticated }),
    },
  ),
)

