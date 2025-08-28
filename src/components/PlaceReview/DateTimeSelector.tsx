import { Pointer } from 'lucide-react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import WheelDateTimePicker from './WheelDateTimePicker'

type DateTimeSelectorProps = {
  valueDate?: Date | null
  valueTime?: { hour: number; minute: number } | null
  onChangeDate?: (date: Date) => void
  onChangeTime?: (time: { hour: number; minute: number }) => void
}

function formatKoreanDate(d: Date) {
  const yy = d.getFullYear().toString().slice(-2)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]

  return `${yy}년 ${m}월 ${day}일 ${weekday}`
}

export default function DateTimeSelector({
  valueDate: controlledDate,
  valueTime: controlledTime,
  onChangeDate,
  onChangeTime,
}: DateTimeSelectorProps) {
  const [date, setDate] = useState<Date | null>(controlledDate ?? null)
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(controlledTime ?? null)

  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)

  if (controlledDate && controlledDate !== date) setDate(controlledDate)
  if (controlledTime && controlledTime !== time) setTime(controlledTime)

  const dateText = useMemo(() => (date ? formatKoreanDate(date) : '날짜 선택'), [date])
  const timeText = useMemo(
    () => (time ? to2(time.hour) + ':' + to2(time.minute) : '시간 선택'),
    [time],
  )

  const showGuideForDate = !date
  const showGuideForTime = !!date && !time // ← 날짜 선택O, 시간 선택X

  return (
    <Wrap>
      <Grid>
        <Cell>
          <Box
            role="button"
            aria-label="날짜 선택"
            $active={!!date}
            onClick={() => setOpenDate(true)}
          >
            <Value $active={!!date}>{dateText}</Value>
            {date && (
              <EditText
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenDate(true)
                }}
              >
                수정
              </EditText>
            )}
          </Box>
        </Cell>

        <Cell>
          <Box
            role="button"
            aria-label="시간 선택"
            $active={!!time}
            onClick={() => setOpenTime(true)}
          >
            <Value $active={!!time} $time>
              {timeText}
            </Value>
            {time && (
              <EditText
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenTime(true)
                }}
              >
                수정
              </EditText>
            )}
          </Box>
        </Cell>

        <Cell>
          {showGuideForDate && (
            <Guide $left>
              <Pointer size={16} color="#f2b705" />
              <span>
                <Highlight>날짜</Highlight>을 선택해주세요!
              </span>
            </Guide>
          )}
        </Cell>

        <Cell>
          {showGuideForTime && (
            <Guide $left>
              <Pointer size={16} color="#f2b705" />
              <span>
                <Highlight>시간</Highlight>을 선택해주세요!
              </span>
            </Guide>
          )}
        </Cell>
      </Grid>

      <WheelDateTimePicker
        open={openDate}
        mode="date"
        initialDate={date ?? new Date()}
        onClose={() => setOpenDate(false)}
        onConfirmDate={(d) => {
          setDate(d)
          onChangeDate?.(d)
          setOpenDate(false)
        }}
      />

      <WheelDateTimePicker
        open={openTime}
        mode="time"
        initialDate={date ?? new Date()}
        initialTime={
          time ?? {
            hour: new Date().getHours(),
            minute: Math.floor(new Date().getMinutes() / 5) * 5,
          }
        }
        onClose={() => setOpenTime(false)}
        onConfirmTime={(t) => {
          setTime(t)
          onChangeTime?.(t)
          setOpenTime(false)
        }}
      />
    </Wrap>
  )
}

function to2(n: number) {
  return n.toString().padStart(2, '0')
}

const Wrap = styled.div`
  width: 100%;
`

const Box = styled.div<{ $active?: boolean }>`
  min-height: 46px;
  border-radius: 12px;
  max-width: 160px;

  flex: none;

  border: ${({ $active }) => ($active ? '0' : '2px solid #073B7B')};
  background: ${({ $active }) => ($active ? '#EEEEEE' : '#F7FAFF')};

  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
`
const Value = styled.span<{ $active?: boolean; $time?: boolean }>`
  color: ${({ $active }) => ($active ? '#222' : '#073B7B')};
  font-weight: ${({ $active }) => ($active ? 700 : 800)};
  font-size: ${({ $time }) => ($time ? '13px' : '13px')};
  padding-left: ${({ $active, $time }) => {
    if (!$active) return '0'
    return $time ? '4px' : '1px'
  }};
`

const EditText = styled.span`
  color: #4b5cff;
  text-decoration: underline;
  font-size: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;

  align-items: start;
  max-width: 360px;
  grid-template-columns: repeat(2, 160px);
  justify-content: center;
  column-gap: 16px;

  margin: 0 auto;
`

const Cell = styled.div``

const Guide = styled.div<{ $left?: boolean }>`
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #0d3b66;
  color: #fff;
  padding: 8px 12px;
  border-radius: 10px;
  position: relative;
  font-size: 12px;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    ${({ $left }) => ($left ? 'left:18px;' : 'right:18px;')}
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: transparent transparent #0d3b66 transparent;
  }
`

const Highlight = styled.span`
  color: #f2b705;
  font-weight: 600;
`
