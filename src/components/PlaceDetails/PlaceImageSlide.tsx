import styled from 'styled-components'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import type { Photo } from '@/types/PlaceDetailsType.ts'

type Props = {
  photos: Photo[]
}

const PlaceImageSlideWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
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
          photos.map((photo, index) => (
            <SwiperSlide key={photo.id ?? index}>
              <Image src={photo.url} alt={`장소 이미지 ${index + 1}`} />
            </SwiperSlide>
          ))}
      </CustomSwiper>
    </PlaceImageSlideWrapper>
  )
}

export default PlaceImageSlide
