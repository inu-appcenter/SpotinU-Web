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
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));

  display: flex;
  justify-content: center;
  z-index: 100;
`

const Button = styled.button<{ disabled?: boolean }>`
  width: min(560px, 100%);
  height: 52px;
  border: none;
  border-radius: 14px;
  background: ${({ disabled }) => (disabled ? '#0d3b66' : '#0d3b66')};
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.3px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: transform 0.06s ease;
  &:active {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.98)')};
  }
`
