import styled from 'styled-components'
import type { PlaceDetails } from '@/types/PlaceDetailsType.ts'

const PlaceTitleWrapper = styled.div`
  padding: 12px 16px;
  position: absolute;
  bottom: 30px;
  color: black;
  z-index: 1;
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
`
const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 450;
  flex-wrap: wrap;
`

type Props = {
  place: PlaceDetails
}

const PlaceTitle = ({ place }: Props) => {
  //필터 매핑 테이블
  const filterMap: Record<string, string> = {
    sleepingAllowed: '취침',
    eatingAllowed: '취식',
    hasPowerOutlet: '콘센트',
    studyAllowed: '개인공부',
    entertainment: '오락시설',
    reservationRequired: '예약제',
  }

  //true인 필터만 표시
  const showTag = Object.entries(filterMap)
    .filter(([key]) => place[key as keyof PlaceDetails])
    .map(([, value]) => `#${value}`)

  //placeType이 야외일때만 표시
  if (place.placeType === 'OUTDOOR') {
    showTag.push('#야외')
  }

  return (
    <PlaceTitleWrapper>
      <Title>
        {place.locationDetail} [{place.name}]
      </Title>
      <Tag>{showTag.join(' ')}</Tag>
    </PlaceTitleWrapper>
  )
}

export default PlaceTitle
