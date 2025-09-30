import styled from 'styled-components'

import InfoBoxWrapper from './InfoBoxWrapper.tsx'
import ReviewItem from './ReviewItem.tsx'

import type { Review } from '@/types/reviewType.ts'

type Props = {
  latestReview?: Review
  onSeeAll?: () => void
}

const SeeAllButton = styled.button`
  font-size: 12px;
  color: #073b7b;
`

const NullText = styled.div`
  font-size: 12px;
  color: #64748b;
`
const ReviewInfoBox = ({ latestReview, onSeeAll }: Props) => {
  return (
    <InfoBoxWrapper
      title={'이용후기'}
      seeAll={latestReview ? <SeeAllButton onClick={onSeeAll}>전체보기 &gt;</SeeAllButton> : null}
    >
      {latestReview ? (
        <ReviewItem review={latestReview} />
      ) : (
        <NullText>아직 이용후기가 없습니다.</NullText>
      )}
    </InfoBoxWrapper>
  )
}

export default ReviewInfoBox
