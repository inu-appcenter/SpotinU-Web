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
  closeOnBackdrop = true, // ✅ 기본값 포함해 구조분해
}: ConfirmModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null) // ✅ 선언

  // ✅ 훅은 항상 호출 → 내부에서만 분기
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

  // ✅ 훅 뒤에서 early return
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
        <Heading id="confirm-modal-heading">확인</Heading>
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

/* 이하 styled-components (Dim, Sheet, Heading, Message, BtnRow, GhostButton, PrimaryButton) */

/* -------------------- styles -------------------- */

const Dim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(17, 24, 39, 0.45); /* #111827 with alpha */
  display: grid;
  place-items: center;
  padding: 20px;
`

const Sheet = styled.div`
  width: min(420px, 92vw);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
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

const Heading = styled.h2`
  margin: 2px 4px 8px;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a; /* slate-900 */
`

const Message = styled.p`
  margin: 6px 4px 16px;
  color: #111827; /* gray-900 */
  line-height: 1.5;
  word-break: keep-all;
`

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`

const GhostButton = styled.button`
  height: 44px;
  border-radius: 10px;
  border: 1px solid #d7dce3;
  background: #fff;
  font-weight: 600;
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
  height: 44px;
  border-radius: 10px;
  border: 0;
  background: #0a5cff;
  color: #fff;
  font-weight: 700;
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

// const BtnRowTwo = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 10px;

//   @media (max-width: 360px) {
//     grid-template-columns: 1fr;
//   }
// `

/* -------------------- usage example (참고용) --------------------
import ConfirmModal from './ConfirmModal';

<ConfirmModal
  open={showEmptyModal}
  onCancel={() => setShowEmptyModal(false)}
  onVisitOnly={() => {
    setShowEmptyModal(false);
    submitVisitOnly();
  }}
  onForceRegister={() => {
    setShowEmptyModal(false);
    submitEmptyReview();
  }}
/>
------------------------------------------------------------------ */
