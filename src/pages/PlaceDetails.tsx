import { Map } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import LoginBottomSheet from '@/components/Common/LoginBottomSheet.tsx'
import DirectionInfoBox from '@/components/PlaceDetails/DirectionInfoBox.tsx'
import PageHeader from '@/components/PlaceDetails/PageHeader.tsx'
import PlaceImageSlide from '@/components/PlaceDetails/PlaceImageSlide.tsx'
import PlaceTitle from '@/components/PlaceDetails/PlaceTitle.tsx'
import ReviewInfoBox from '@/components/PlaceDetails/ReviewInfoBox.tsx'
import ReviewModal from '@/components/PlaceDetails/ReviewModal.tsx'
import TimeInfoBox from '@/components/PlaceDetails/TimeInfoBox.tsx'
import usePlaceDetails from '@/hooks/usePlaceDetails.ts'
import { useViewportVH } from '@/hooks/useViewportVH'
import { useAuthStore } from '@/stores/authStore'

const PlaceDetailsWrapper = styled.div``

const SlideWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
`
const HeaderWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`
const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
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

const PlaceDetails = () => {
  useViewportVH()

  const { id } = useParams()
  const spotId = Number(id)
  const { place } = usePlaceDetails(spotId)

  const [showModal, setShowModal] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [isSaved, setIsSaved] = useState(false) //저장 여부
  const toggleSave = () => setIsSaved((prev) => !prev) // 저장 상태 토글
  const navigate = useNavigate()

  const isLogin = useAuthStore((s) => s.isAuthenticated)

  const handleReviewClick = () => {
    if (isLogin) {
      navigate('/place/review')
    } else {
      setShowBottomSheet(true)
    }
  }

  const handleClickLogin = () => {
    navigate('/login')
  }

  if (!place) return null

  const sortReviews = [...place.reviews].sort(
    (a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime(),
  )

  return (
    <>
      <PlaceDetailsWrapper className="app">
        <HeaderWrapper>
          <PageHeader
            isLogin={isLogin}
            isSaved={isSaved}
            toggleSave={toggleSave}
            showLoginSheet={() => setShowBottomSheet(true)}
            goToReviewPage={handleReviewClick}
          />
        </HeaderWrapper>

        <SlideWrapper>
          <PlaceImageSlide photos={place.photos} />
        </SlideWrapper>

        <PlaceTitle place={place} />

        <Content className={'app-content'}>
          <TimeInfoBox
            businessHours={place.businessHours}
            businessHoursDetail={place.businessHoursDetail}
          />
          <MapButton onClick={() => console.log('캠퍼스맵으로 이동')}>
            <Map size={14} />
            인천대 캠퍼스맵으로 이동
          </MapButton>
          <DirectionInfoBox directions={place.descriptionDetail} />
          <ReviewInfoBox latestReview={sortReviews[0]} onSeeAll={() => setShowModal(true)} />
        </Content>

        <div className={'bottom-gap'} />
      </PlaceDetailsWrapper>
      {showModal && <ReviewModal reviews={sortReviews} onClose={() => setShowModal(false)} />}
      {showBottomSheet && (
        <LoginBottomSheet
          isOpen={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          onClickLogin={handleClickLogin}
        />
      )}
    </>
  )
}

export default PlaceDetails
