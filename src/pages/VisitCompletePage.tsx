// 리뷰 등록

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import CommentCard from '../components/PlaceReview/CommentCard/CommentCard'
import KeywordChips from '../components/PlaceReview/CommentCard/KeywordChips'
import PlaceTitle from '../components/PlaceReview/VisitComplete/PlaceTitle'
import PrimaryButton from '../components/PlaceReview/VisitComplete/PrimaryButton'
import PrivateTip from '../components/PlaceReview/VisitComplete/PrivateTip'
import VisitMetaRow from '../components/PlaceReview/VisitComplete/VisitMetaRow'

type VisitCompleteState = {
  placeName?: string
  buildingText?: string
  visitAt?: string // ISO string
  visitCount?: number // 1번째 방문
  isFavorite?: boolean
  keywords?: string[]
  noKeyword?: boolean
  mediaUrls?: string[]
  comment?: string
}

export default function VisitComplete() {
  console.log('Render: VisitCompletePage')
  const nav = useNavigate()
  const { state } = useLocation() as { state?: VisitCompleteState }

  const placeTitle = state?.placeName ?? state?.buildingText ?? '00호관 00층 00호'

  const visitDate = state?.visitAt ? new Date(state.visitAt) : new Date()
  const dateText = format(visitDate, 'M월 d일 EEE', { locale: ko }) // 예: 7월 25일 금
  const timeText = format(visitDate, 'a h시', { locale: ko }) // 예: 오후 3시
    .replace('AM', '오전')
    .replace('PM', '오후')
  const countText = state?.visitCount ? `${state.visitCount}번째 방문` : undefined

  const isFavorite = !!state?.isFavorite

  const keywords = state?.keywords ?? []
  const mediaUrls = state?.mediaUrls ?? []
  const comment = state?.comment ?? ''

  return (
    <Page>
      <PlaceTitle
        title={placeTitle}
        isFavorite={isFavorite}
        onToggleFavorite={() => {
          console.log('toggle favorite')
        }}
      />

      <PrivateTip />

      <VisitMetaRow
        dateText={dateText}
        timeText={timeText}
        countText={countText}
        onDelete={() => {
          console.log('내역 삭제')
        }}
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

      <BottomSpacer />
    </Page>
  )
}

const Page = styled.div`
  min-height: 100dvh;
  background: #f6f7f8;
  display: flex;
  flex-direction: column;
`

const CTA = styled.div`
  padding: 16px;
`

const BottomSpacer = styled.div`
  height: 72px; /* 앱의 하단 네비 높이에 맞춰 조절 */
`
