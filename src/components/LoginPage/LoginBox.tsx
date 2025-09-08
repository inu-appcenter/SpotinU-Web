import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

export default function LoginBox() {
  const [studentNumber, setStudentNumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
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
        alert('로그인 성공')
        navigate(-1)
      } else if (response.status === 400) {
        alert(`비밀번호가 일치하지 않습니다. 다시 시도해주세요.`)
      } else if (response.status === 500) {
        const goToRegister = window.confirm(`로그인이 처음이시군요. 회원가입 페이지로 이동할까요?`)
        if (goToRegister) {
          navigate('/register', { state: { studentNumber: studentNumber, password: password } })
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

  return (
    <LoginBoxWrapper>
      <Title>인천대 구성원</Title>
      <SubText>학교 포탈 아이디로 별도의 회원가입 없이 바로 로그인하세요!</SubText>

      <Input
        type="text"
        placeholder="ID"
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
        <LogoutText>로그아웃</LogoutText>
      </BottomRow>

      <LoginButton onClick={handleLogin}>로그인</LoginButton>
    </LoginBoxWrapper>
  )
}
