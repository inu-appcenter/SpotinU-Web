import styled from 'styled-components'

import PlaceCard from './PlaceCard'

import { BottomGap } from '@/components/Common/BottomNavBar'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { usePlaces } from '@/hooks/usePlaces'

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
  filter?: string | ''
}

export default function PlaceList({ onCardClick, filter = '' }: Props) {
  const { list, loading, hasNext, loadMore } = usePlaces(8, filter)

  // 최신 상태를 보게 하고, 로딩/마지막 페이지 때는 관찰 잠깐 중지
  const bottomRef = useInfiniteScroll(
    () => {
      if (!loading && hasNext) loadMore()
    },
    [loading, hasNext, loadMore], // loadMore 포함
    { disabled: loading || !hasNext }, // 관찰 일시 중지
  )

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
