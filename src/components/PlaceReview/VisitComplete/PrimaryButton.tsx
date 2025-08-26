// 이용 후기 수정
import styled from 'styled-components'

type Props = {
  label: string // 버튼 텍스트
  onClick?: () => void // 클릭 이벤트
  disabled?: boolean // 비활성화 여부
}

export default function PrimaryButton({ label, onClick, disabled }: Props) {
  return (
    <Btn type="button" onClick={onClick} disabled={disabled}>
      {label}
    </Btn>
  )
}

/* ---------- styled ---------- */
const Btn = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 0;
  cursor: pointer;

  background: #007aff; /* 기본 파란색 CTA */
  color: #fff;
  font-weight: 700;
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #0062cc;
  }

  &:disabled {
    background: #d1d1d6;
    cursor: not-allowed;
  }
`
