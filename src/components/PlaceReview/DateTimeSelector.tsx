import { useMemo, useState } from 'react'
import styled from 'styled-components'

import WheelDateTimePicker from './WheelDateTimePicker'

type Props = {
  valueDate?: Date | null
  valueTime?: { hour: number; minute: number } | null
  onChangeDate?: (date: Date) => void
  onChangeTime?: (time: { hour: number; minute: number }) => void
}

export default function DateTimeSelector({
  valueDate: controlledDate,
  valueTime: controlledTime,
  onChangeDate,
  onChangeTime,
}: Props) {
  const [date, setDate] = useState<Date | null>(controlledDate ?? null)
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(controlledTime ?? null)

  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)

  // 외부에서 값이 바뀌어 들어오는 경우도 반영

  if (controlledDate && controlledDate !== date) setDate(controlledDate)
  if (controlledTime && controlledTime !== time) setTime(controlledTime)

  const dateText = useMemo(() => (date ? formatKoreanDate(date) : '날짜 선택'), [date])
  const timeText = useMemo(
    () => (time ? to2(time.hour) + ':' + to2(time.minute) : '시간 선택'),
    [time],
  )

  const showGuideForDate = !date
  const showGuideForTime = !!date && !time // ← 날짜 선택했고, 시간은 아직 없을 때

  return (
    <Wrap>
      {/* <Row>
        <Box
          role="button"
          aria-label="날짜 선택"
          $active={!!date}
          onClick={() => setOpenDate(true)}
        >
          <span>{dateText}</span>
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

        <Spacer />

        <Box
          role="button"
          aria-label="시간 선택"
          $active={!!time}
          onClick={() => setOpenTime(true)}
        >
          <span>{timeText}</span>
        </Box>
      </Row> */}

      {/* // 가이드 말풍선  */}
      {/* {showGuideForDate && <Guide $left>날짜를 선택해주세요 !</Guide>}
      {showGuideForTime && <Guide> 시간을 선택해주세요 !</Guide>}  */}

      <Grid>
        <Cell>
          <Box
            role="button"
            aria-label="날짜 선택"
            $active={!!date}
            onClick={() => setOpenDate(true)}
          >
            <span>{dateText}</span>
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
            <span>{timeText}</span>
            {time && (
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

        {/* 버튼 바로 아래 각 칸에 가이드 배치 */}
        <Cell>{showGuideForDate && <Guide $left> 날짜를 선택해주세요 !</Guide>}</Cell>
        <Cell>{showGuideForTime && <Guide> 시간을 선택해주세요 !</Guide>}</Cell>
      </Grid>

      {/* 날짜 휠 모달 */}
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

      {/* 시간 휠 모달 */}
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

/* ===== utils / styles ===== */

function to2(n: number) {
  return n.toString().padStart(2, '0')
}
function formatKoreanDate(d: Date) {
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
  return `${m}월${day}일 ${weekday}`
}

const Wrap = styled.div`
  width: 100%;
`

// const Row = styled.div`
//   display: flex;
//   gap: 16px;
//   align-items: center;
// `

const Box = styled.div<{ $active?: boolean }>`
  flex: 1;
  min-height: 52px;
  border-radius: 12px;
  border: 2px solid ${({ $active }) => ($active ? '#111' : '#222')};
  background: ${({ $active }) => ($active ? '#efefef' : '#fff')};
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const EditText = styled.span`
  color: #4b5cff;
  text-decoration: underline;
  font-size: 14px;
`

// const Spacer = styled.div`
//   width: 16px;
// `

// const Guide = styled.div<{ $left?: boolean }>`
//   margin-top: 10px;
//   display: inline-block;
//   background: #0d3b66;
//   color: #fff;
//   padding: 10px 14px;
//   border-radius: 10px;
//   position: relative;
//   font-size: 14px;

//   ${({ $left }) => ($left ? 'margin-right:auto;' : 'margin-left:auto;')}

//   &::before {
//     content: '';
//     position: absolute;
//     top: -8px;
//     ${({ $left }) => ($left ? 'left:18px;' : 'right:18px;')}
//     border-width: 0 8px 8px 8px;
//     border-style: solid;
//     border-color: transparent transparent #0d3b66 transparent;
//   }
// `
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px; /* 행 간격 / 열 간격 */
  align-items: start;
`

const Cell = styled.div``

const Guide = styled.div<{ $left?: boolean }>`
  margin-top: 6px;
  display: inline-block;
  background: #0d3b66;
  color: #fff;
  padding: 10px 14px;
  border-radius: 10px;
  position: relative;
  font-size: 14px;

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
