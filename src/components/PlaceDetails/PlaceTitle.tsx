import styled from 'styled-components'

//필터 매핑 테이블 (재사용 가능하면 따로 뺄 예정)
const filterMap: Record<string, string> = {
  sleepingAllowed: '취침',
  eatingAllowed: '취식',
  hasPowerOutlet: '콘센트',
  studyAllowed: '개인공부',
  entertainment: '오락시설',
  reservationRequired: '예약제',
}

const data = {
  name: '선예원',
  locationDetail: '11호관 302호',
  sleepingAllowed: true,
  eatingAllowed: false,
  hasPowerOutlet: true,
  studyAllowed: true,
  entertainment: false,
  reservationRequired: true,
  placeType: 'INDOOR',
}

//true인 필터만 표시
const showTag = Object.entries(filterMap)
  .filter(([key]) => data[key as keyof typeof data])
  .map(([, value]) => `#${value}`)

//placeType이 야외일때만 표시
if (data.placeType === 'OUTDOOR') {
  showTag.push('#야외')
}

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

const PlaceTtitle = () => {
  return (
    <PlaceTitleWrapper>
      <Title>
        {data.locationDetail} [{data.name}]
      </Title>
      <Tag>{showTag.join(' ')}</Tag>
    </PlaceTitleWrapper>
  )
}

export default PlaceTtitle
