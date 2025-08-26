import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'

import InputField from './InputField.tsx'

type Props = {
  onPrivacyClick: () => void
}

const Wrapper = styled.div`
  border: none;
  border-radius: 20px;
  padding: 16px;
  width: calc(100% - 32px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`

const AgreeRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  margin: 14px 0;
`
const AgreeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`
const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  position: relative;
  top: 1.5px;
`

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ disabled }) => (disabled ? '#ddd' : '#073B7B')};
  color: white;
  font-size: 16px;
  font-weight: 500;
`

const RegisterBox = ({ onPrivacyClick }: Props) => {
  const [nickname, setNickname] = useState('')
  const [department, setDepartment] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [building, setBuilding] = useState('')
  const [agreed, setAgreed] = useState(false)

  //뭔진 모르겠는데 닉네임/학번 조합 ?
  const isValidNickname = /^[가-힣a-z0-9]{4,12}$/.test(nickname)
  const isValidStudentNumber = /^\d{9}$/.test(studentNumber)

  //에러 텍스트
  const nicknameError = nickname.length === 0 ? '' : !isValidNickname ? '다시 입력해주세요' : ''

  const studentNumberError =
    studentNumber.length === 0 ? '' : !isValidStudentNumber ? '다시 입력해주세요' : ''

  //필수항목 입력했는지
  const isMustWrite = isValidNickname && department.trim() !== '' && isValidStudentNumber && agreed

  const handleCheckNickname = () => {
    console.log('중복확인 버튼')
  }

  const handleSubmit = () => {
    console.log('제출하기 버튼 ')
  }

  return (
    <Wrapper>
      <InputField
        label="닉네임*"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임을 입력하세요"
        subText="4~12자 / 한글, 영문 소문자(숫자 조합 가능)"
        hasCheckButton
        onCheck={handleCheckNickname}
        error={nicknameError}
      />

      <InputField
        label="학과*"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="ex: 도시과학대학 도시건축학부 도시건축학전공 "
      />

      <InputField
        label="학번*"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        placeholder="ex: 2025*****"
        error={studentNumberError}
      />

      <InputField
        label="전공 호관"
        value={building}
        onChange={(e) => setBuilding(e.target.value)}
        placeholder="ex: 12호관, 28호관"
      />

      <AgreeRow>
        <AgreeLabel>
          <StyledCheckbox type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
          <span>개인정보 수집 및 이용 동의* </span>
        </AgreeLabel>
        <ChevronRight size={16} onClick={onPrivacyClick} />
      </AgreeRow>

      <SubmitButton disabled={!isMustWrite} onClick={handleSubmit}>
        가입
      </SubmitButton>
    </Wrapper>
  )
}

export default RegisterBox
