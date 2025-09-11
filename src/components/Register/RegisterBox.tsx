import { ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

import InputField from './InputField.tsx'

type Props = {
  onPrivacyClick?: () => void
  showPrivacy?: boolean
  onValidChange?: (valid: boolean) => void
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

const RegisterBox = ({ onPrivacyClick, showPrivacy, onValidChange }: Props) => {
  const [name, setName] = useState('')
  const [studentNumber, setStudentNumber] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)

  //모두 입력했는지
  const isMustWrite =
    name.trim() !== '' &&
    studentNumber.trim() !== '' &&
    password.trim() !== '' &&
    (showPrivacy ? agreed : true)

  useEffect(() => {
    onValidChange?.(isMustWrite)
  }, [isMustWrite, onValidChange])

  return (
    <Wrapper>
      <InputField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />

      <InputField
        label="학번"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        placeholder="ex: 2025*****"
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        subText={'8~20자'}
      />

      {showPrivacy && (
        <AgreeRow>
          <AgreeLabel>
            <StyledCheckbox type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
            <span>개인정보 수집 및 이용 동의* </span>
          </AgreeLabel>
          <ChevronRight size={16} onClick={onPrivacyClick} />
        </AgreeRow>
      )}
    </Wrapper>
  )
}

export default RegisterBox
