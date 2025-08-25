import { Calendar, Smile, Sofa } from 'lucide-react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

import type { Review } from '../../types/reviewType'

// 요일 매핑
const getDay = (dateStr: string): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[new Date(dateStr).getDay()]
}

// 후기 키워드 매핑
const keywordMap: Record<string, { icon: () => ReactNode; text: string }> = {
  COZY: {
    icon: () => <Smile size={14} color="#99a1af" />,
    text: '아늑해요',
  },
  COMFORTABLE_SEATING: {
    icon: () => <Sofa size={14} color="#99a1af" />,
    text: '자리가 편해요',
  },
  // 모든 키워드 추가
}

type Props = {
  review: Review
}

const ReviewWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const Photo = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
`

const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const DateText = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #99a1af;
  font-size: 12px;
`

const Content = styled.div`
  font-size: 12px;
  font-weight: 500;
  white-space: pre-wrap;
`

const Keyword = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const KeywordItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
`
const IconWrapper = styled.div`
  top: 1px;
  display: inline-flex;
  position: relative;
`

const ReviewItem = ({ review }: Props) => {
  const { photo, content, visitDate, visitTime, keywords } = review
  const day = `${visitDate.replaceAll('-', '.')} (${getDay(visitDate)}) ${visitTime.slice(0, 2)}시`

  return (
    <ReviewWrapper>
      {photo && <Photo src={photo} alt="후기사진" />}
      <RightGroup>
        <DateText>
          <IconWrapper>
            <Calendar size={14} />
          </IconWrapper>
          <div>{day}</div>
        </DateText>
        <Content>“ {content} ”</Content>
        <Keyword>
          {keywords.map((keyword) => {
            const mapped = keywordMap[keyword]
            return (
              mapped && (
                <KeywordItem key={keyword}>
                  <IconWrapper>{mapped.icon()}</IconWrapper>
                  {mapped.text}
                </KeywordItem>
              )
            )
          })}
        </Keyword>
      </RightGroup>
    </ReviewWrapper>
  )
}

export default ReviewItem
