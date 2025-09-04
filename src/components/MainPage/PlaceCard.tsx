import { Building2, MapPin, Users } from 'lucide-react'
import styled from 'styled-components'

export type Place = {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
  tags?: string[]
}

type Props = { place: Place; onClick?: (id: string) => void }

const Card = styled.article`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 100%;
  height: 180px; /* 고정 높이 */
  object-fit: cover; /* 비율 유지하며 채우기 */
`

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

/* 첫 줄: 제목 좌 / 설명 우 */
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`
const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`
const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  text-align: right;
  flex-shrink: 0;
`

/* 두 번째 줄: 건물/층 정보 */
const MiddleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
`

/* 세 번째 줄: 타입 좌 / 거리 우 */
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

const TypeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #374151;
`

const DistanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #1d4ed8;
  font-weight: 600;
`

const PlaceCard = ({ place, onClick }: Props) => {
  return (
    <Card onClick={() => onClick?.(place.id)}>
      <Image src={place.imageUrl} alt={place.title} />

      <Body>
        <TopRow>
          <Title>{place.title}</Title>
          <Subtitle>{place.subtitle}</Subtitle>
        </TopRow>

        <MiddleRow>
          <Building2 size={16} />
          <span>{place.building}</span>
        </MiddleRow>

        <BottomRow>
          <TypeInfo>
            <Users size={16} />
            <span>{place.typeText}</span>
          </TypeInfo>
          <DistanceInfo>
            <MapPin size={16} />
            <span>{place.distanceText}</span>
          </DistanceInfo>
        </BottomRow>
      </Body>
    </Card>
  )
}

export default PlaceCard
