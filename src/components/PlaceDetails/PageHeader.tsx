import { ArrowLeft } from 'lucide-react'
import styled from 'styled-components'

import ReviewButton from './ReviewButton.tsx'

import SaveButton from '@/components/Common/SaveButton.tsx'

/**
 * 장소 상세페이지 상단 헤더
 * 뒤로가기 + 후기등록버튼 + 저장하기 버튼
 * 후기/저장버튼은 로그인 여부에 따라 동작 달라짐
 */

const PageHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: transparent;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const PageHeader = ({
  isLogin,
  isSaved,
  toggleSave,
  showLoginSheet,
  goToReviewPage,
}: {
  isLogin: boolean
  isSaved?: boolean
  toggleSave: () => void
  showLoginSheet: () => void
  goToReviewPage: () => void
}) => {
  return (
    <PageHeaderWrapper>
      <Left>
        <button onClick={() => window.history.back()}>
          <ArrowLeft size={24} color={'#000000'} />
        </button>
      </Left>

      <Right>
        <ReviewButton
          isLogin={isLogin}
          onClickLogin={showLoginSheet}
          onClickReview={goToReviewPage}
        />
        <SaveButton isSaved={isLogin && isSaved} onClick={isLogin ? toggleSave : showLoginSheet} />
      </Right>
    </PageHeaderWrapper>
  )
}

export default PageHeader
