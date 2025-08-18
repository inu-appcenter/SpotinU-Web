// src/components/MainPage/PlaceList.tsx
import styled from 'styled-components'

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { usePlaces } from '../../hooks/usePlaces'
import { BottomGap } from '../Common/BottomNavBar'

import PlaceCard from './PlaceCard'

const List = styled.div`
  background: transparent; /* 전역 배경과 통일 */
`
const Sentinel = styled.div`
  height: 10px;
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
}

export default function PlaceList({ onCardClick }: Props) {
  const { list, loading, hasNext, loadMore } = usePlaces(8)

  // 네가 이미 만든 무한스크롤 훅 사용 (바닥 치면 loadMore)
  const bottomRef = useInfiniteScroll(() => {
    if (!loading && hasNext) loadMore()
  }, [loading, hasNext])

  return (
    <>
      <List>
        {list.map((p) => (
          <PlaceCard key={p.id} place={p} onClick={onCardClick} />
        ))}
        <Sentinel ref={bottomRef} />
      </List>

      {loading && <Loading>불러오는 중…</Loading>}
      {!hasNext && !loading && <TheEnd>마지막입니다</TheEnd>}

      <BottomGap />
    </>
  )
}
