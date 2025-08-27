// 리뷰 등록
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import BottomNavBar from '../components/Common/BottomNavBar'
import CommonModal from '../components/Common/CommonModal'
import SaveButton from '../components/Common/SaveButton'
import CommentCard from '../components/PlaceReview/CommentCard/CommentCard'
import KeywordChips from '../components/PlaceReview/CommentCard/KeywordChips'
import PlaceTitle from '../components/PlaceReview/VisitComplete/PlaceTitle'
import PrimaryButton from '../components/PlaceReview/VisitComplete/PrimaryButton'
import PrivateTip from '../components/PlaceReview/VisitComplete/PrivateTip'
import VisitMetaRow from '../components/PlaceReview/VisitComplete/VisitMetaRow'

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

export default function VisitCompletePage() {
  const nav = useNavigate()
  const { state } = useLocation() as { state?: VisitCompleteState }

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

  const isLogin = true
  const [isSaved, setIsSaved] = useState<boolean>(!!state?.isFavorite)
  const showLoginSheet = useCallback(() => {
    console.log('로그인 필요: 로그인 시트 열기')
  }, [])

  const toggleSave = useCallback(async () => {
    if (!isLogin) return showLoginSheet()

    setIsSaved((prev) => !prev)
    try {
      // TODO: API 연동 (저장/해제)
      // if (!isSaved) await api.save(state?.placeId)
      // else await api.unsave(state?.placeId)
    } catch (e) {
      console.error(e)
      // 실패 시 롤백
      setIsSaved((prev) => !prev)
    }
  }, [isLogin, showLoginSheet /*, isSaved, state?.placeId */])

  useEffect(() => {
    if (!isDeleteOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDeleteOpen])
  //// 선택임

  const handleConfirmDelete = useCallback(async () => {
    try {
      // TODO: 방문내역 삭제 API 호출
      console.log('방문내역 삭제 확정')

      setDeleteOpen(false)
      nav(-1)
    } catch (e) {
      console.error(e)
      setDeleteOpen(false)
    }
  }, [nav /* , state?.visitId */])

  const handleCancelDelete = useCallback(() => {
    setDeleteOpen(false)
  }, [])

  return (
    <Viewport>
      <Screen>
        <Main>
          <PlaceTitle
            title={placeTitle}
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

const Viewport = styled.div`
  min-height: 100dvh;
  background: #f6f7f8;
  overflow-y: auto;
`

const Screen = styled.div`
  width: min(100vw, 430px);
  margin: 0 auto;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
`

const CTA = styled.div`
  padding: 16px 0;
`
const Center = styled.div`
  text-align: center;
`
