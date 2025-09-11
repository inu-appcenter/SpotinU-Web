import styled from 'styled-components'

type Props = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  subText?: string
  type?: string
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

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
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

const InputField = ({ label, value, onChange, placeholder, subText, type = 'text' }: Props) => {
  return (
    <Wrapper>
      <Label>{label}</Label>

      <InputWrapper>
        <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
      </InputWrapper>

      {subText && <SubText>{subText}</SubText>}
    </Wrapper>
  )
}

export default InputField
