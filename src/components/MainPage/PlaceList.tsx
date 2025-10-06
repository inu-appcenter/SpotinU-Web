import styled from 'styled-components'

import PlaceCard from './PlaceCard'

import { BottomGap } from '@/components/Common/BottomNavBar'
import { usePlaces } from '@/hooks/usePlaces'

const List = styled.div`
  background: transparent; /* 전역 배경과 통일 */
`
const Loading = styled.p`
  text-align: center;
  color: #6b7280;
  padding: 8px 0;
`
const TheEnd = styled.p`
  text-align: center;
  color: #9ca3af;
  padding: 8px 0;
`

type Props = {
  onCardClick?: (id: string) => void
  filter?: string | ''
}

const PlaceList = ({ onCardClick, filter = '' }: Props) => {
  const { list, loading } = usePlaces(8, filter)

  return (
    <>
      <List>
        {list.map((p) => (
          <PlaceCard key={p.id} place={p} onClick={onCardClick} />
        ))}
      </List>

      {loading && <Loading>불러오는 중…</Loading>}
      {!loading && list.length === 0 && <TheEnd>표시할 장소가 없습니다</TheEnd>}

      <BottomGap />
    </>
  )
}

export default PlaceList
