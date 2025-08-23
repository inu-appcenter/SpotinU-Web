import styled from 'styled-components'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

type Props = {
  photos: string[]
}

const PlaceImageSlideWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.5;
  position: relative;
`
const CustomSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: #ffb300;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PlaceImageSlide = ({ photos }: Props) => {
  return (
    <PlaceImageSlideWrapper>
      <CustomSwiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }} // 하단 도트 클릭으로 넘기기 가능
        loop={true}
      >
        {photos.length > 0 &&
          photos.map((src, index) => (
            <SwiperSlide key={index}>
              <Image src={src} alt={`장소 이미지 ${index + 1}`} />
            </SwiperSlide>
          ))}
      </CustomSwiper>
    </PlaceImageSlideWrapper>
  )
}

export default PlaceImageSlide
