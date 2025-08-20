/* 장소 상세 페이지 */
import styled from 'styled-components'
import PlaceImageSlide from '../components/PlaceDetails/PlaceImageSlide.tsx'
import PageHeader from '../components/PlaceDetails/PageHeader.tsx'
import { useViewportVH } from '../hooks/useViewportVH'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 100vh;
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
  margin-top: -60px;
`
const PlaceDetails = () => {
  useViewportVH()

  const ImageDummy = ['/장소사진더미.svg', '/장소사진더미.svg', '/장소사진더미.svg']

  return (
    <Wrapper className="app">
      <SlideWrapper>
        <PlaceImageSlide photos={ImageDummy} />
        <HeaderWrapper>
          <PageHeader />
        </HeaderWrapper>
      </SlideWrapper>

      <Content></Content>
    </Wrapper>
  )
}

export default PlaceDetails
