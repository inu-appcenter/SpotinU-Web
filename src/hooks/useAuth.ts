import { AxiosError } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import api from '@/contexts/axios.ts'
import { useAuthContext } from '@/hooks/useAuthContext'

//서버 응답 타입
type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuthContext()

  //회원가입
  const signup = async (name: string, studentNumber: string, password: string) => {
    try {
      const body = {
        name,
        studentNumber: Number(studentNumber),
        password,
        role: 'USER',
      }

      await api.post<ApiResponse<null>>('/api/v1/auth/signup', body)

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
      const { data } = await api.post<ApiResponse<string>>('/api/v1/auth/login', body)

      setAuth(data.data, studentNumber)
      alert('로그인이 완료되었습니다.')

      //상세페이지( 이용후기등록 등)를 통해 회원가입-> 자동로그인 후 원래 경로로 복귀
      const from = (location.state as { from?: string })?.from
      navigate(from || '/', { replace: true })
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
          const from = (location.state as { from?: string })?.from
          navigate('/register', { state: { studentNumber, from } })
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
      await api.delete('/api/v1/auth/delete')
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
