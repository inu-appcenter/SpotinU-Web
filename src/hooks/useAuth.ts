import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { api } from '@/apis/api'
import { useAuthContext } from '@/hooks/useAuthContext'

//서버 응답 타입
type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export const useAuth = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  //회원가입
  const signup = async (name: string, studentNumber: string, password: string) => {
    try {
      const body = {
        name,
        studentNumber: Number(studentNumber),
        password,
        role: 'USER',
      }

      await api.post<ApiResponse<null>>('/auth/signup', body)

      alert('회원가입이 완료되었습니다. 자동으로 로그인 할게요!')

      await login(studentNumber, password)
    } catch (err: unknown) {
      const error = err as AxiosError<{ status: number; message: string; data?: unknown }>
      const res = error.response
      if (!res) {
        alert('응답이 안 온다')
        return
      }

      if (res.status === 409) {
        alert(res.data?.message ?? '이미 존재하는 학번입니다.')
      } else if (res.status === 400 && res.data?.data) {
        const messages = Object.values(res.data.data).join('\n')
        alert(messages)
      } else {
        alert(res.data?.message ?? '회원가입 중 알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  //로그인
  const login = async (studentNumber: string, password: string) => {
    try {
      const body = { studentNumber: Number(studentNumber), password }
      console.log('🔍 login request:', api.defaults.baseURL, body)

      const { data } = await api.post<ApiResponse<string>>('/auth/login', body)

      const accessToken = data.data
      setAuth(accessToken, studentNumber)

      alert('로그인 성공!')
      navigate(-1)
    } catch (err: unknown) {
      const error = err as AxiosError<{ status: number; message: string; data?: unknown }>
      const res = error.response
      if (!res) {
        alert('네트워크 오류가 발생했습니다.')
        return
      }

      if (res.status === 400) {
        alert('비밀번호가 일치하지 않습니다.')
      } else if (res.status === 500) {
        const goToRegister = window.confirm(
          '회원가입 정보가 없습니다. 회원가입 페이지로 이동할까요?',
        )
        if (goToRegister) {
          navigate('/register', { state: { studentNumber } })
        }
      } else {
        alert(res.data?.message ?? '로그인 실패 !')
      }
    }
  }

  // 로그아웃
  const logout = () => {
    setAuth(null, null)
    alert('로그아웃 되었습니다.')
    navigate('/')
  }

  //회원탈퇴
  const deleteAccount = async () => {
    try {
      await api.delete('/auth/delete')
      setAuth(null, null)

      alert('회원탈퇴가 완료되었습니다.')
      navigate('/')
    } catch (err: unknown) {
      const error = err as AxiosError<{ status: number; message: string; data?: unknown }>
      const res = error.response
      if (!res) {
        alert('네트워크 오류가 발생했습니다.')
        return
      }
      alert(res.data?.message ?? '회원탈퇴 중 오류가 발생했습니다.')
    }
  }

  return { signup, login, logout, deleteAccount }
}
