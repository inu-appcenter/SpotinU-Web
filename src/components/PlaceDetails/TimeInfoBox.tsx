import { Clock } from 'lucide-react'
import styled from 'styled-components'

import InfoBoxWrapper from './InfoBoxWrapper.tsx'

type Props = {
  right: string
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

const TimeInfoBox = ({ right }: Props) => {
  const left = `월 ~ 금\n토요일\n매주 일요일 및 공휴일`
  const rightLines = right.split('\n')

  return (
    <InfoBoxWrapper title={'운영시간'} icon={<Clock size={18} color={'#073B7B'} />}>
      <TimeContent>
        <LeftText>{left}</LeftText>
        <RightText>
          {rightLines.map((line, i) =>
            line.includes('휴관') ? <RedText key={i}>{line}</RedText> : <div key={i}>{line}</div>,
          )}
        </RightText>
      </TimeContent>
    </InfoBoxWrapper>
  )
}

export default TimeInfoBox
