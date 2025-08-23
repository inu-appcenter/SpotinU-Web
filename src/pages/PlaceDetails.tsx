import { Map } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'

import BottomNavBar from '../components/Common/BottomNavBar.tsx'
import DirectionInfoBox from '../components/PlaceDetails/DirectionInfoBox.tsx'
import PageHeader from '../components/PlaceDetails/PageHeader.tsx'
import PlaceImageSlide from '../components/PlaceDetails/PlaceImageSlide.tsx'
import PlaceTitle from '../components/PlaceDetails/PlaceTitle.tsx'
import ReviewInfoBox from '../components/PlaceDetails/ReviewInfoBox.tsx'
import ReviewModal from '../components/PlaceDetails/ReviewModal.tsx'
import TimeInfoBox from '../components/PlaceDetails/TimeInfoBox.tsx'
import { businessHours, directions, imageDummy, reviews } from '../dummy/PlaceDetailsDummy.ts'
import { useViewportVH } from '../hooks/useViewportVH'

const PlaceDetailsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: var(--bg);
`

const SlideWrapper = styled.div`
  position: relative;
  z-index: 0;
`
const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`
const Content = styled.div`
  z-index: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const MapButton = styled.button`
  width: 100%;
  background: #073b7b;
  color: white;
  font-size: 12px;
  border-radius: 20px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const sortReviews = [...reviews].sort(
  (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime(),
)

const PlaceDetails = () => {
  useViewportVH()
  const [tab, setTab] = useState<'find' | 'map' | 'me'>('find')
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <PlaceDetailsWrapper className="app">
        <SlideWrapper>
          <PlaceImageSlide photos={imageDummy} />
          <HeaderWrapper>
            <PageHeader />
          </HeaderWrapper>
          <PlaceTitle />
        </SlideWrapper>

        <Content>
          <TimeInfoBox right={businessHours} />
          <MapButton onClick={() => console.log('캠퍼스맵으로 이동')}>
            <Map size={14} />
            인천대 캠퍼스맵으로 이동
          </MapButton>
          <DirectionInfoBox directions={directions} />
          <ReviewInfoBox latestReview={sortReviews[0]} onSeeAll={() => setShowModal(true)} />
        </Content>
        <BottomNavBar activeKey={tab} onChange={(key) => setTab(key as 'find' | 'map' | 'me')} />
      </PlaceDetailsWrapper>
      {showModal && <ReviewModal reviews={sortReviews} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default PlaceDetails
