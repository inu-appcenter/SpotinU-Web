// 사진/영상 + 리뷰 코멘트가 존재하지 않을때, 확인하는 Modal

import { useEffect, useRef } from 'react'
import styled from 'styled-components'

type ConfirmModalProps = {
  open: boolean
  onCancel: () => void
  onVisitOnly: () => void
  message?: string
  cancelLabel?: string
  visitOnlyLabel?: string
  closeOnBackdrop?: boolean
}

export default function ConfirmModal({
  open,
  onCancel,
  onVisitOnly,
  message = '작성된 리뷰 내용이 없습니다.<br/>방문만 기록하시겠습니까?',
  cancelLabel = '취소',
  visitOnlyLabel = '방문만 기록',
  closeOnBackdrop = true, //  기본값 포함해 구조분해
}: ConfirmModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKeyDown)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [open, onCancel])
  if (!open) return null

  const handleBackdrop = () => {
    if (closeOnBackdrop) onCancel()
  }

  return (
    <Dim role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <Sheet
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="confirm-modal-heading"
      >
        <Message dangerouslySetInnerHTML={{ __html: message }} />
        <BtnRow>
          <GhostButton type="button" onClick={onCancel}>
            {cancelLabel}
          </GhostButton>
          <PrimaryButton type="button" onClick={onVisitOnly}>
            {visitOnlyLabel}
          </PrimaryButton>
        </BtnRow>
      </Sheet>
    </Dim>
  )
}

const Dim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  padding: 20px;
`

const Sheet = styled.div`
  width: min(440px, 90vw);
  border-radius: 12px;
  background: #fff;

  height: 210px;

  padding: 18px 16px 16px;
  animation: pop 140ms ease-out;

  @keyframes pop {
    from {
      transform: translateY(6px) scale(0.98);
      opacity: 0.6;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`

const Message = styled.p`
  margin: 40px 4px 25px;
  color: #111827;
  line-height: 1.5;
  word-break: keep-all;
  text-align: center;
  font-size: 14px;
`

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 20px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`

const GhostButton = styled.button`
  height: 30px;
  width: 130px;
  border-radius: 10px;
  border: 2px solid #073b7b;
  background: #fff;
  font-weight: 600;
  font-size: 12px;
  margin-left: 28px; ///// _____________이거 나중에 한번에 묶어서 관리하도록 바꿔야됨________________

  color: #0f172a;
  transition:
    transform 0.06s ease,
    background 0.12s ease;

  &:active {
    transform: translateY(1px);
  }
  &:hover {
    background: #f8fafc;
  }
`

const PrimaryButton = styled.button`
  height: 30px;
  width: 130px;
  border-radius: 10px;
  border: 0;
  background: #073b7b;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  transition:
    transform 0.06s ease,
    filter 0.12s ease;

  &:active {
    transform: translateY(1px);
  }
  &:hover {
    filter: brightness(0.96);
  }
`
