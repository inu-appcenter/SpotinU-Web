import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  //로그인
  const login = async (studentNumber: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNumber: parseInt(studentNumber, 10),
          password,
        }),
      })

      const result = await response.json()

      if (response.status === 200) {
        localStorage.setItem('accessToken', result.data)
        localStorage.setItem('studentNumber', studentNumber)

        alert('로그인 성공')
        navigate(-1)
      } else if (response.status === 400) {
        alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.')
      } else if (response.status === 500) {
        const goToRegister = window.confirm('로그인이 처음이시군요. 회원가입 페이지로 이동할까요?')
        if (goToRegister) {
          navigate('/register', { state: { studentNumber } })
        } else {
          navigate(-1)
        }
      } else {
        alert(`로그인 실패: ${result.message}`)
      }
    } catch (err) {
      console.error(err)
      alert('로그인 중 오류 발생')
    }
  }

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('studentNumber')
    alert('로그아웃 되었습니다.')
    navigate('/')
  }

  return { login, logout }
}
