import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import BottomNavBar from '@/components/Common/BottomNavBar'
import CommonModal from '@/components/Common/CommonModal'
import SaveButton from '@/components/Common/SaveButton'
import BackBtn from '@/components/PlaceReview/Btns/BackBtn'
import CommentCard from '@/components/PlaceReview/CommentCard/CommentCard'
import KeywordChips from '@/components/PlaceReview/CommentCard/KeywordChips'
import PlaceTitle from '@/components/PlaceReview/VisitComplete/PlaceTitle'
import PrimaryButton from '@/components/PlaceReview/VisitComplete/PrimaryButton'
import PrivateTip from '@/components/PlaceReview/VisitComplete/PrivateTip'
import VisitMetaRow from '@/components/PlaceReview/VisitComplete/VisitMetaRow'

type VisitCompleteState = {
  placeName?: string
  buildingText?: string
  visitAt?: string
  visitCount?: number
  isFavorite?: boolean
  keywords?: string[]
  noKeyword?: boolean
  mediaUrls?: string[]
  comment?: string
}

const VisitCompletePage = () => {
  const navigate = useNavigate()
  const nav = useNavigate()
  const { state } = useLocation() as { state?: VisitCompleteState }

  const [showKeyword, setShowKeyword] = useState(false)

  const onBack = () => {
    if (showKeyword) {
      setShowKeyword(false)
      return
    }

    navigate('/place/review', {
      replace: true,
      state: {
        step: 'media', // ← 바로 글/사진 화면으로
        visitAt: state?.visitAt,
        keywords: state?.keywords ?? [],
        noKeyword: !!state?.noKeyword,
        mediaUrls: state?.mediaUrls ?? [],
        comment: state?.comment ?? '',
      },
    })
  }

  // 삭제 확인 모달 on/off (공용 CommonModal 사용)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  const placeTitle = state?.placeName ?? state?.buildingText ?? '00호관 00층 00호'
  const visitDate = state?.visitAt ? new Date(state.visitAt) : new Date()
  const dateText = format(visitDate, 'M월 d일 EEE', { locale: ko })
  const timeText = format(visitDate, 'a h시', { locale: ko })
    .replace('AM', '오전')
    .replace('PM', '오후')
  const countText = state?.visitCount ? `${state.visitCount}번째 방문` : undefined

  const isFavorite = !!state?.isFavorite
  const keywords = state?.keywords ?? []
  const mediaUrls = state?.mediaUrls ?? []
  const comment = state?.comment ?? ''

  // 저장(즐겨찾기) 버튼 상태
  const isLogin = true
  const [isSaved, setIsSaved] = useState<boolean>(!!state?.isFavorite)
  const showLoginSheet = useCallback(() => {
    console.log('로그인 필요: 로그인 시트 열기')
  }, [])
  const toggleSave = useCallback(async () => {
    if (!isLogin) return showLoginSheet()
    setIsSaved((prev) => !prev)
    try {
      // TODO: 저장/해제 API 연동
    } catch (e) {
      console.error(e)
      setIsSaved((prev) => !prev) // 실패 시 롤백
    }
  }, [isLogin, showLoginSheet])

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (!isDeleteOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDeleteOpen])

  // 삭제 확정
  const handleConfirmDelete = useCallback(async () => {
    try {
      // TODO: 방문내역 삭제 API
      console.log('방문내역 삭제 확정')
      setDeleteOpen(false)
      nav(-1)
    } catch (e) {
      console.error(e)
      setDeleteOpen(false)
    }
  }, [nav])

  // 삭제 취소
  const handleCancelDelete = useCallback(() => {
    setDeleteOpen(false)
  }, [])

  // 헤더 높이를 CSS 변수에 기록해서 그라디언트 분기점으로 사용
  useLayoutEffect(() => {
    const headerEl = document.querySelector('header')
    const h = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 56
    document.documentElement.style.setProperty('--header-h', `${h}px`)
  }, [])

  return (
    <Viewport>
      <BackWrap>
        <BackBtn onClick={onBack} />
      </BackWrap>

      <Screen>
        <Main>
          <PlaceTitle
            buildingText={placeTitle} // 아랫줄만
            hideLabel // 윗줄 숨김
            isFavorite={isFavorite}
            onToggleFavorite={() => console.log('toggle favorite')}
            rightSlot={
              <SaveButton
                isSaved={isLogin && isSaved}
                onClick={isLogin ? toggleSave : showLoginSheet}
              />
            }
          />

          <PrivateTip />

          <VisitMetaRow
            dateText={dateText}
            timeText={timeText}
            countText={countText}
            onDelete={() => setDeleteOpen(true)}
          />

          {keywords.length > 0 && <KeywordChips keywords={keywords} />}

          <CommentCard text={comment} imageUrls={mediaUrls} />

          <CTA>
            <PrimaryButton
              label=" 이용 후기 수정하기"
              onClick={() =>
                nav('/place/review/edit', {
                  state: {
                    from: 'visit-complete',
                    placeName: state?.placeName,
                    buildingText: state?.buildingText,
                    visitAt: visitDate.toISOString(),
                    medias: [],
                    comment: '',
                  },
                })
              }
            />
          </CTA>
        </Main>
      </Screen>

      <BottomNavBar />

      {/* ▼ 공용 모달로 교체된 삭제 확인 모달 */}
      <CommonModal
        isOpen={isDeleteOpen}
        title="방문내역 삭제"
        content={
          <Center>
            이후 다시 리뷰를 작성할 수 없습니다.
            <br />
            삭제하시겠습니까?
          </Center>
        }
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Viewport>
  )
}

export default VisitCompletePage

const BackWrap = styled.div`
  position: absolute;
  top: 16px;

  z-index: 100;
`

const Viewport = styled.div`
  min-height: 100dvh;
  overflow-y: auto;
`

const Screen = styled.div`
  width: min(100vw, 430px);
  margin: 0 auto;

  margin-top: -1px;
  padding-top: 1px;

  background: transparent;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
  gap: 16px;
`

const CTA = styled.div`
  padding: 16px 0;
`

const Center = styled.div`
  text-align: center;
`
