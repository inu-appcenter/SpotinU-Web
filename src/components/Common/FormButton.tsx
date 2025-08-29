import styled from 'styled-components'

type Props = {
  buttonStyle: 'filled' | 'outline'
  text: string
  onClick: () => void
  disabled?: boolean
}

const ButtonWrapper = styled.button<{ $buttonStyle: 'filled' | 'outline'; disabled?: boolean }>`
  width: calc(100% - 96px);
  height: 35px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;

  ${({ $buttonStyle, disabled }) =>
    $buttonStyle === 'filled'
      ? `
    background-color: ${disabled ? '#ddd' : '#073B7B'};
    color: white;
    border: none;
  `
      : `
    background-color: white;
    color: #073B7B;
    border: 2px solid #073B7B;
  `}
`

const FormButton = ({ buttonStyle, text, onClick, disabled }: Props) => {
  return (
    <ButtonWrapper $buttonStyle={buttonStyle} onClick={onClick} disabled={disabled}>
      {text}
    </ButtonWrapper>
  )
}

export default FormButton
