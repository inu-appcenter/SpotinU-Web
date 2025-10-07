import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

const ITEM_H = 36
const WHEEL_H = 180
const PAD_H = (WHEEL_H - ITEM_H) / 2

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

const WheelDateTimePicker = ({
  open,
  mode,
  initialDate = new Date(),
  initialTime = { hour: 12, minute: 0 },
  onClose,
  onConfirmDate,
  onConfirmTime,
}: Props) => {
  const [year, setYear] = useState(initialDate.getFullYear())
  const [month, setMonth] = useState(initialDate.getMonth() + 1)
  const [day, setDay] = useState(initialDate.getDate())

  const [hour, setHour] = useState(initialTime.hour)
  const [minute, setMinute] = useState(initialTime.minute - (initialTime.minute % 5))

  const daysInMonth = useMemo(() => new Date(year, month, 0).getDate(), [year, month])

  useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth)
  }, [daysInMonth, day])

  const baseYear = initialDate.getFullYear()
  const years = useMemo(() => range(baseYear - 3, baseYear + 6), [baseYear])
  const months = useMemo(() => range(1, 12), [])
  const days = useMemo(() => range(1, daysInMonth), [daysInMonth])
  const hours = useMemo(() => range(0, 23), [])
  const minutes = useMemo(() => range(0, 55, 5), [])

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

export default WheelDateTimePicker

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
    el.scrollTo({ top: index * ITEM_H, behavior: 'auto' })
  }, [])

  //  스크롤 시 중앙 항목으로 값 동기화
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollTop / ITEM_H)
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
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
  z-index: 1000;
`

const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  background: #282828ff;
  color: #e6e9ee;
  border-radius: 22px;
  padding: 16px 14px 14px;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.06);
`

const WheelWrap = styled.div<{ $cols: 2 | 3 }>`
  position: relative;
  margin-top: 5px;
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${$cols}, 1fr)`};
  gap: 10px;
  height: ${WHEEL_H}px;
`

const CenterHighlight = styled.div`
  pointer-events: none;
  position: absolute;
  left: 8px;
  right: 8px;
  top: calc(50% - ${ITEM_H / 2}px);
  height: ${ITEM_H}px;
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`

const Col = styled.div`
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  padding: 0 4px;
  -webkit-overflow-scrolling: touch;

  mask-image: linear-gradient(to bottom, transparent, black 16%, black 84%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 16%, black 84%, transparent);

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Item = styled.div`
  height: ${ITEM_H}px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;

  font-size: 15px;
  font-weight: 400;
  color: rgba(230, 233, 238, 0.55);
  transform: translateZ(0);
  transition: color 0.12s ease;

  &[aria-selected='true'] {
    color: #eef2f6;
    font-weight: 600;
  }
`

const Pad = styled.div`
  height: ${PAD_H}px;
`
