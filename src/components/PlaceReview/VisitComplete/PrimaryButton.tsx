// 이용 후기 수정
import { PencilLine } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  label: string // 버튼 텍스트
  onClick?: () => void // 클릭 이벤트
  disabled?: boolean // 비활성화 여부
}

export default function PrimaryButton({ label, onClick, disabled }: Props) {
  return (
    <Btn type="button" onClick={onClick} disabled={disabled}>
      <PencilLine size={18} strokeWidth={2} />
      {label}
    </Btn>
  )
}

const Btn = styled.button`
  width: 93%;
  height: 48px;
  border-radius: 20px;
  border: 0;
  cursor: pointer;
  margin: auto;

  background: #073b7b;
  color: #fff;
  font-weight: 300;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  transition: background 0.2s ease;

  &:disabled {
    background: #d1d1d6;
    cursor: not-allowed;
  }
`
