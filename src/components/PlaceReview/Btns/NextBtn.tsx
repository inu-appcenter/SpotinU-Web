// 다음 Btn
import styled from 'styled-components'

type Props = {
  label?: string
  disabled?: boolean
  onClick: () => void
}

export default function NextBtn({ label = '다음', disabled, onClick }: Props) {
  return (
    <Bar>
      <Button disabled={disabled} onClick={onClick}>
        {label}
      </Button>
    </Bar>
  )
}

const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 1px 12px calc(env(safe-area-inset-bottom) + 28px);
  display: flex;
  justify-content: center;
  z-index: 100;
  background: #f8f9fe;
`

const Button = styled.button<{ disabled?: boolean }>`
  width: calc(100% - 50px);
  max-width: 560px;

  height: 40px;
  border: none;
  border-radius: 50px;
  background: ${({ disabled }) => (disabled ? '#0d3b66' : '#0d3b66')};
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.3px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: transform 0.06s ease;
  &:active {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.98)')};
  }
`
