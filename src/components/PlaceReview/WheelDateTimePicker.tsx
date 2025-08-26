import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

type TimeVal = { hour: number; minute: number }

type Props = {
  open: boolean
  mode: 'date' | 'time'
  initialDate?: Date
  initialTime?: TimeVal
  onClose: () => void
  onConfirmDate?: (d: Date) => void
  onConfirmTime?: (t: TimeVal) => void
}

export default function WheelDateTimePicker({
  open,
  mode,
  initialDate = new Date(),
  initialTime = { hour: 12, minute: 0 },
  onClose,
  onConfirmDate,
  onConfirmTime,
}: Props) {
  /** ----- state ----- */
  const [year, setYear] = useState(initialDate.getFullYear())
  const [month, setMonth] = useState(initialDate.getMonth() + 1) // 1~12
  const [day, setDay] = useState(initialDate.getDate())

  const [hour, setHour] = useState(initialTime.hour)
  const [minute, setMinute] = useState(initialTime.minute - (initialTime.minute % 5)) // 5분 스텝

  /** 월별 일수(윤년 포함) */
  const daysInMonth = useMemo(() => new Date(year, month, 0).getDate(), [year, month])

  /** day가 넘치면 보정 */
  useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth)
  }, [daysInMonth, day])

  /** ----- wheel data ----- */
  const baseYear = initialDate.getFullYear()
  const years = useMemo(() => range(baseYear - 3, baseYear + 6), [baseYear])
  const months = useMemo(() => range(1, 12), [])
  const days = useMemo(() => range(1, daysInMonth), [daysInMonth])
  const hours = useMemo(() => range(0, 23), [])
  const minutes = useMemo(() => range(0, 55, 5), [])

  /** 훅 선언 이후에 조건부 렌더 */
  if (!open) return null

  //  바깥 클릭 시 현재 값으로 자동 저장 + 닫기
  const confirmAndClose = () => {
    if (mode === 'date') onConfirmDate?.(new Date(year, month - 1, day))
    else onConfirmTime?.({ hour, minute })
    onClose()
  }

  return (
    //  바깥 클릭 -> 자동 저장에  닫기까지
    <Dim onClick={confirmAndClose}>
      {/* 안쪽 클릭은 전파 막기 (딤 클릭으로 처리되지 않도록) */}
      <Modal role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <WheelWrap $cols={mode === 'date' ? 3 : 2}>
          {mode === 'date' ? (
            <>
              <WheelColumn
                values={years}
                value={year}
                onChange={setYear}
                itemFormatter={(v) => `${v}년`}
              />
              <WheelColumn
                values={months}
                value={month}
                onChange={setMonth}
                itemFormatter={(v) => `${v}월`}
              />
              <WheelColumn
                values={days}
                value={day}
                onChange={setDay}
                itemFormatter={(v) => `${v}일`}
              />
            </>
          ) : (
            <>
              <WheelColumn
                values={hours}
                value={hour}
                onChange={setHour}
                itemFormatter={(v) => `${pad(v)}시`}
              />
              <WheelColumn
                values={minutes}
                value={minute}
                onChange={setMinute}
                itemFormatter={(v) => `${pad(v)}분`}
              />
            </>
          )}
          <CenterHighlight aria-hidden />
        </WheelWrap>
      </Modal>
    </Dim>
  )
}

// WheelColumn (scroll-snap)
function WheelColumn<T extends number | string>({
  values,
  value,
  onChange,
  itemFormatter,
}: {
  values: T[]
  value: T
  onChange: (v: T) => void
  itemFormatter?: (v: T) => string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const index = Math.max(
    0,
    values.findIndex((v) => v === value),
  )

  // 처음 렌더 시 현재 값 위치로 스크롤
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const itemH = 44
    el.scrollTo({ top: index * itemH, behavior: 'auto' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //  스크롤 시 중앙 항목으로 값 동기화
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const itemH = 44
      const i = Math.round(el.scrollTop / itemH)
      const clamp = Math.min(values.length - 1, Math.max(0, i))
      const v = values[clamp]
      if (v !== value) onChange(v)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [values, value, onChange])

  return (
    <Col ref={ref}>
      <Pad />
      {values.map((v) => (
        <Item key={String(v)} aria-selected={v === value} onClick={() => onChange(v)}>
          {itemFormatter ? itemFormatter(v) : String(v)}
        </Item>
      ))}
      <Pad />
    </Col>
  )
}

// utils
function pad(n: number) {
  return n.toString().padStart(2, '0')
}
function range(start: number, end: number, step = 1) {
  const out: number[] = []
  for (let v = start; v <= end; v += step) out.push(v)
  return out
}

const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
  z-index: 1000;
`

const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  background: #111;
  color: #fff;
  border-radius: 20px;
  padding: 18px 16px 16px;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.4);
`

const WheelWrap = styled.div<{ $cols: 2 | 3 }>`
  position: relative;
  margin-top: 14px;
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols}, 1fr)`};
  gap: 12px;

  height: 240px;
`

const CenterHighlight = styled.div`
  pointer-events: none;
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(50% - 22px);
  height: 44px;
  border-radius: 12px; /* 둥근 하이라이트 바 */
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    /* 얇은 외곽선 */ 0 2px 12px rgba(0, 0, 0, 0.35); /* 살짝 그림자 */
`

const Col = styled.div`
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  padding: 0 6px;
  -webkit-overflow-scrolling: touch;

  /* 양 끝 페이드 */
  mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);

  /* iOS처럼 스크롤바 숨김 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Item = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  font-size: 18px;
  opacity: 0.45;
  transform: scale(0.96);
  transition:
    opacity 0.15s,
    transform 0.15s,
    font-weight 0.15s;

  /* 선택된 중앙 라인 */
  &[aria-selected='true'] {
    opacity: 1;
    transform: scale(1.02);
    font-weight: 700;
  }
`

const Pad = styled.div`
  height: calc((240px - 44px) / 2);
`
