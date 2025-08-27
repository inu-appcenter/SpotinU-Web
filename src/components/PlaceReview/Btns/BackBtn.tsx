// src/components/Common/BackButton.tsx
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  onClick?: () => void
}

export default function BackButton({ onClick }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1) // 기본 동작: 이전 페이지로 이동
    }
  }

  return (
    <Button onClick={handleClick}>
      <ChevronLeft size={24} />
    </Button>
  )
}

const Button = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  color: black;

  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`
