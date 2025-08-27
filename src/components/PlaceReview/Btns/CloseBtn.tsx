import { X } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  onClose?: () => void
  size?: number
}

export default function CloseButton({ onClose, size = 22 }: Props) {
  return (
    <Btn onClick={onClose}>
      <X size={size} strokeWidth={1.5} />
    </Btn>
  )
}

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 4px;
  cursor: pointer;
`
