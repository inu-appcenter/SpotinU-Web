import { X } from 'lucide-react'
import styled from 'styled-components'

import type { Review } from '../../types/reviewType'

import ReviewItem from './ReviewItem'

type Props = {
  reviews: Review[]
  onClose: () => void
}

const ModalWrapper = styled.div`
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;

  display: flex;
  position: fixed;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8); // 뒷배경 어둡게
`

const ModalContent = styled.div`
  width: calc(100vw - 32px);
  max-width: 400px;
  padding: 20px;
  overflow: hidden;
  background-color: #eeeeee;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
`
const Title = styled.div``
const CloseButton = styled.button``
const ReviewList = styled.div<{ $count: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: ${({ $count }) => ($count > 3 ? 'scroll' : 'visible')};
  max-height: ${({ $count }) => ($count > 3 ? '240px' : 'none')};

  scrollbar-width: auto;
`

const ReviewModal = ({ reviews, onClose }: Props) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <Top>
          <Title>이용후기</Title>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Top>

        <ReviewList $count={reviews.length}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ReviewList>
      </ModalContent>
    </ModalWrapper>
  )
}

export default ReviewModal
