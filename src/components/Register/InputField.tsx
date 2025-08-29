import styled from 'styled-components'

type Props = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  subText?: string
  hasCheckButton?: boolean
  onCheck?: () => void
  error?: string
  showNotice?: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  margin-top: 16px;
`

const InputWrapper = styled.div`
  position: relative;
`
const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 3px;
`

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
`
const RequireNotice = styled.span`
  color: black;
  font-size: 10px;
`

const CheckButton = styled.button`
  color: #073b7b;
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  align-items: center;
  position: absolute;
  right: 14px;
  top: 45%;
  transform: translateY(-50%);
`

const Input = styled.input`
  background-color: #eeeeee;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 14px;
  font-size: 14px;
  width: 100%;
  align-items: center;
`

const SubText = styled.p`
  font-size: 10px;
  color: #a7a7a7;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0 16px 2px 2px;
`

const ErrorText = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0 16px 2px 2px;
`

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  subText,
  hasCheckButton,
  onCheck,
  error,
  showNotice,
}: Props) => {
  return (
    <Wrapper>
      {showNotice ? (
        <LabelRow>
          <Label>{label}</Label>
          <RequireNotice>*표시는 필수 입력 항목입니다</RequireNotice>
        </LabelRow>
      ) : (
        <Label>{label}</Label>
      )}
      <InputWrapper>
        <Input type="text" value={value} onChange={onChange} placeholder={placeholder} />
        {hasCheckButton && <CheckButton onClick={onCheck}>중복확인</CheckButton>}
      </InputWrapper>

      {subText && <SubText>{subText}</SubText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  )
}

export default InputField
