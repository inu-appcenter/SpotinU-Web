import { ChevronLeft } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  onPrev?: () => void
  onNext?: () => void
  prevLabel?: string
  nextLabel?: string
  nextDisabled?: boolean
  fixed?: boolean
  bottom?: string
  className?: string
}

export default function PrevNextBtn({
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음',
  nextDisabled,
  fixed = true,
  bottom,
  className,
}: Props) {
  return (
    <Bar $fixed={fixed} $bottom={bottom} className={className}>
      <Buttons>
        <Ghost type="button" onClick={onPrev}>
          <ChevronLeft size={18} strokeWidth={2.5} />
          <span>{prevLabel}</span>
        </Ghost>

        <Primary type="button" disabled={nextDisabled} onClick={onNext}>
          {nextLabel}
        </Primary>
      </Buttons>
    </Bar>
  )
}

const Bar = styled.div<{ $fixed?: boolean; $bottom?: string }>`
  position: ${({ $fixed }) => ($fixed ? 'fixed' : 'static')};
  left: ${({ $fixed }) => ($fixed ? 0 : 'auto')};
  right: ${({ $fixed }) => ($fixed ? 0 : 'auto')};
  bottom: ${({ $fixed, $bottom }) =>
    $fixed ? ($bottom ?? 'env(safe-area-inset-bottom)') : 'auto'};

  background: #f8f9fe;
  padding: 10px 16px calc(26px + env(safe-area-inset-bottom));

  display: flex;
  justify-content: center;
  z-index: 100;
`

const Buttons = styled.div`
  width: min(560px, 100%);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
`
const Ghost = styled.button`
  height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #111;
  font-weight: 600;
  font-size: 18px;

  cursor: pointer;
`

const Primary = styled.button<{ disabled?: boolean }>`
  height: 47px;
  min-width: 92px;
  padding: 0 18px;
  border-radius: 13px;
  border: 0;
  font-weight: 500;
  color: #fff;
  background: #073b7b;
  font-size: 17px;
`
