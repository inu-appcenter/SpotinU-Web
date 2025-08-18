import { useState } from 'react'
import styled from 'styled-components'

// 민준 :
// 사실 이 임포트 방식이 좋지 않음
// alias 걸어서 @/ 이렇게 하는게 좋을 것 같긴 한데.. 이건 논의해보죠
import BottomNavBar from '../components/Common/BottomNavBar'
import Banner from '../components/MainPage/Banner'
import FilterButtons, { type FilterKey } from '../components/MainPage/FilterButtons'
import PlaceList from '../components/MainPage/PlaceList'
import { useViewportVH } from '../hooks/useViewportVH'

const TopPad = styled.div`
  height: 12px;
` // 배너 위 여백
const Content = styled.section`
  flex: 1;
`
const StickyWrap = styled.div`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky-top, 50);
  background: #f3f5f7;
`

const MainPage = () => {
  useViewportVH() // iOS 폴백 vh 설정 피하려고 호출하는 훅임
  const [tab, setTab] = useState<'find' | 'map' | 'me'>('find')
  const [filter, setFilter] = useState<FilterKey | ''>('')

  return (
    <main className="app">
      <TopPad />
      <Banner />

      <StickyWrap>
        <FilterButtons value={filter} onChange={setFilter} />
      </StickyWrap>

      <Content className="app-content">
        <PlaceList
          onCardClick={(id) => console.log('상세페이지로 넘어가기 라우팅 구현해야댐', id)}
        />
      </Content>

      <BottomNavBar activeKey={tab} onChange={(key) => setTab(key as 'find' | 'map' | 'me')} />
    </main>
  )
}
export default MainPage
