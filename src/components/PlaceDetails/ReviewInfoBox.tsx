import styled from 'styled-components'

import type { Review } from '../../types/reviewType.ts'

import InfoBoxWrapper from './InfoBoxWrapper.tsx'
import ReviewItem from './ReviewItem.tsx'

type Props = {
  latestReview?: Review
  onSeeAll?: () => void
}

const ReviewInfoBox = ({ latestReview, onSeeAll }: Props) => {
  if (!latestReview) return null

  const SeeAllButton = styled.button`
    font-size: 12px;
    color: #073b7b;
  `

  return (
    <InfoBoxWrapper
      title={'이용후기'}
      seeAll={<SeeAllButton onClick={onSeeAll}>전체보기 &gt;</SeeAllButton>}
    >
      <ReviewItem review={latestReview} />
    </InfoBoxWrapper>
  )
}

export default ReviewInfoBox
