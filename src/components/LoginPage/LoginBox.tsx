import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAuth } from '@/hooks/useAuth.ts'
import { useAuthStore } from '@/stores/authStore'

const LoginBoxWrapper = styled.div`
  padding: 12px 16px;
  border: 1px solid #073b7b;
  border-radius: 12px;
  width: calc(100% - 32px);
`

const Title = styled.h2`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`

const SubText = styled.p`
  text-align: center;
  font-size: clamp(12px, 2.5vw, 14px); //최소12px 최대 14px
  margin-bottom: 10px;
  white-space: nowrap;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0 12px;
  margin-bottom: 16px;
  background-color: #eeeeee;
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 40px;
  background-color: #073b7b;
  color: white;
  font-weight: 600;
  border-radius: 20px;
  margin: 10px auto 0;
`

const LogoutText = styled.button`
  font-size: 12px;
  color: black;
  margin-left: auto;
  text-decoration: underline;
`

const LoginBox = () => {
  const [studentNumber, setStudentNumber] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const savedStudentNumber = useAuthStore((s) => s.studentNumber)
  const { login, logout } = useAuth()
  const navigate = useNavigate()

  // 로그인 상태라면 컨텍스트의 학번 값을 반영
  useEffect(() => {
    if (isAuthenticated) {
      setStudentNumber(savedStudentNumber ?? '')
      setPassword('')
    }
  }, [isAuthenticated, savedStudentNumber])

  return (
    <LoginBoxWrapper>
      <Title>인천대 구성원</Title>
      <SubText>학교 포탈 아이디로 별도의 회원가입 없이 바로 로그인하세요!</SubText>

      <Input
        type="text"
        placeholder="학번"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <BottomRow>
        {isAuthenticated ? (
          <LogoutText onClick={logout}>로그아웃</LogoutText>
        ) : (
          <LogoutText
            onClick={() => navigate('/register', { state: { studentNumber } })}
            disabled={loading}
          >
            회원가입
          </LogoutText>
        )}
      </BottomRow>
      <LoginButton
        onClick={async () => {
          try {
            setLoading(true)
            await login(studentNumber, password)
          } finally {
            setLoading(false)
          }
        }}
        disabled={loading}
      >
        {loading ? '로그인 중…' : '로그인'}
      </LoginButton>
    </LoginBoxWrapper>
  )
}

export default LoginBox
