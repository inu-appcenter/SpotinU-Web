import { Clock } from 'lucide-react'
import styled from 'styled-components'

import InfoBoxWrapper from './InfoBoxWrapper.tsx'

type Props = {
  businessHours: string
  businessHoursDetail: string
}

const TimeContent = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: pre-wrap;
  font-size: 12px;
  line-height: 1.5;
  color: #4a5565;
`
const LeftText = styled.div``

const RightText = styled.div`
  text-align: right;
`
const RedText = styled.span`
  color: red;
`

const TimeInfoBox = ({ businessHours, businessHoursDetail }: Props) => {
  const rows = formatBusinessHours(businessHours, businessHoursDetail)

  return (
    <InfoBoxWrapper title={'운영시간'} icon={<Clock size={18} color={'#073B7B'} />}>
      <TimeContent>
        <LeftText>
          {rows.map((r, i) => (
            <div key={i}>{r.label}</div>
          ))}
        </LeftText>
        <RightText>
          {rows.map((r, i) =>
            r.isHoliday ? <RedText key={i}>{r.value}</RedText> : <div key={i}>{r.value}</div>,
          )}
        </RightText>
      </TimeContent>
    </InfoBoxWrapper>
  )
}

export default TimeInfoBox

//운영시간 변환 로직
function formatBusinessHours(bh: string, bhd: string) {
  const rows: { label: string; value: string; isHoliday?: boolean }[] = []

  const formatTime = (t: string) => {
    if (t === '2400') return '24시간'
    if (/^\d{4}~\d{4}$/.test(t)) {
      const [s, e] = t.split('~')
      const fmt = (x: string) => x.slice(0, 2) + ':' + x.slice(2)
      return `${fmt(s)}~${fmt(e)}`
    }
    return t
  }
  //나중에 하나로 통일
  if (bhd === '동일' || bhd === '동' || bhd === '예약 필수') {
    rows.push({ label: '매일', value: formatTime(bh) })
  } else if (bhd === '휴무') {
    rows.push({ label: '평일', value: formatTime(bh) })
    rows.push({ label: '주말', value: '휴무', isHoliday: true })
  } else if (bhd?.includes(',')) {
    const [sat, sun] = bhd.split(',')
    rows.push({ label: '월 ~ 금', value: formatTime(bh) })
    rows.push({
      label: '토요일',
      value: sat === '휴무' ? sat : formatTime(sat),
      isHoliday: sat === '휴무',
    })
    rows.push({
      label: '일요일',
      value: sun === '휴무' ? sun : formatTime(sun),
      isHoliday: sun === '휴무',
    })
  } else if (bhd) {
    rows.push({ label: '평일', value: formatTime(bh) })
    rows.push({ label: '주말', value: formatTime(bhd) })
  } else {
    rows.push({ label: '매일', value: formatTime(bh) })
  }

  return rows
}
