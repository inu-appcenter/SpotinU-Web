import styled from 'styled-components'

type Props = {
  onPrev?: () => void
  onNext?: () => void
  prevLabel?: string
  nextLabel?: string
  nextDisabled?: boolean

  /** 위치 제어 */
  fixed?: boolean // 기본 true (기존과 동일 동작)
  bottom?: string // 예: "0" | "calc(64px + 16px + env(safe-area-inset-bottom))"
  className?: string
}

export default function PrevNextBtn({
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음',
  nextDisabled,
  //
  fixed = true,
  bottom,
  className,
  //
}: Props) {
  return (
    <Bar $fixed={fixed} $bottom={bottom} className={className}>
      <Buttons>
        <Ghost type="button" onClick={onPrev}>
          {prevLabel}
        </Ghost>
        <Primary type="button" disabled={nextDisabled} onClick={onNext}>
          {nextLabel}
        </Primary>
      </Buttons>
    </Bar>
  )
}

/** transient props 로 DOM 전달 방지 */
const Bar = styled.div<{ $fixed?: boolean; $bottom?: string }>`
  position: ${({ $fixed }) => ($fixed ? 'fixed' : 'static')};
  left: ${({ $fixed }) => ($fixed ? 0 : 'auto')};
  right: ${({ $fixed }) => ($fixed ? 0 : 'auto')};
  bottom: ${({ $fixed, $bottom }) => ($fixed ? ($bottom ?? '0') : 'auto')};

  background: #fff;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  z-index: 100; /* BottomNavBar(60)보다 높게 */
`

const Buttons = styled.div`
  width: min(560px, 100%);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
`

const Ghost = styled.button`
  height: 52px;
  border-radius: 14px;
  border: 1px solid #d7dbe2;
  background: #fff;
  font-weight: 800;
`

const Primary = styled.button<{ disabled?: boolean }>`
  height: 52px;
  border-radius: 14px;
  border: 0;
  font-weight: 800;
  color: #fff;
  background: ${({ disabled }) => (disabled ? '#cfd3da' : '#0d3b66')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
