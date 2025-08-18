import {
  BookOpen,
  Calendar,
  Gamepad2,
  GraduationCap,
  Home,
  RotateCcw,
  Trees,
  Utensils,
} from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'

export type FilterKey =
  | '취침'
  | '취식'
  | '콘텐츠'
  | '개인공부'
  | '야외'
  | '오락시설'
  | '예약제'
  | '초기화'

type Props = {
  value?: FilterKey | ''
  onChange?: (next: FilterKey | '') => void
  sticky?: boolean
  className?: string
}

const ALL = [
  { key: '취침', Icon: Home },
  { key: '취식', Icon: Utensils },
  { key: '콘텐츠', Icon: BookOpen },
  { key: '개인공부', Icon: GraduationCap },
  { key: '야외', Icon: Trees },
  { key: '오락시설', Icon: Gamepad2 },
  { key: '예약제', Icon: Calendar },
  { key: '초기화', Icon: RotateCcw },
] as const

const ACTIVE_BG = '#073B7B'

const FilterButtons = ({ value, onChange, sticky = true, className }: Props) => {
  const [inner, setInner] = useState<FilterKey | ''>('')
  const selected = value ?? inner

  const pick = (key: FilterKey) => {
    if (key === '초기화') {
      if (value === undefined) setInner('')
      onChange?.('')
      return
    }
    const next = selected === key ? ('' as const) : key
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  return (
    <Wrap $sticky={sticky} className={className}>
      <Grid role="group" aria-label="장소 필터">
        {ALL.map(({ key, Icon }) => {
          const active = selected === key
          return (
            <Chip key={key} $active={active} onClick={() => pick(key)} aria-pressed={active}>
              <Icon className="ico" />
              <span className="txt">{key}</span>
            </Chip>
          )
        })}
      </Grid>
    </Wrap>
  )
}
export default FilterButtons

const Wrap = styled.div<{ $sticky: boolean }>`
  background: transparent;
  ${({ $sticky }) =>
    $sticky
      ? `
    position: sticky; top: 0; z-index: var(--z-sticky-top, 50);
  `
      : ''}
  padding: 14px 16px 12px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4×2 균일 */
  gap: 12px;
`
const Chip = styled.button<{ $active?: boolean }>`
  width: 100%; /* 같은 폭 */
  height: 40px; /* 같은 높이 */
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : '#e5e7eb')};
  background: ${({ $active }) => ($active ? ACTIVE_BG : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#374151')};
  box-shadow: ${({ $active }) =>
    $active ? '0 4px 10px rgba(7,59,123,0.35)' : '0 1px 3px rgba(0,0,0,0.06)'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.1s ease,
    box-shadow 0.2s ease;
  &:active {
    transform: scale(0.97);
  }
  .ico {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
  }
  .txt {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
