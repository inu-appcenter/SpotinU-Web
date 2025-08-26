// 리뷰 등록

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import PlaceTitle from '../components/PlaceReview/VisitComplete/PlaceTitle'
import PrimaryButton from '../components/PlaceReview/VisitComplete/PrimaryButton'
import PrivateTip from '../components/PlaceReview/VisitComplete/PrivateTip'
import VisitMetaRow from '../components/PlaceReview/VisitComplete/VisitMetaRow'

type VisitCompleteState = {
  // PlaceReviewPage → navigate로 넘긴 값들
  placeName?: string
  buildingText?: string
  visitAt?: string // ISO string
  visitCount?: number // 1번째 방문 등
  isFavorite?: boolean
  // 이번 케이스에서는 의도적으로 비어 있음:
  // medias?: []; comment?: '';
}

export default function VisitComplete() {
  console.log('Render: VisitCompletePage')
  const nav = useNavigate()
  const { state } = useLocation() as { state?: VisitCompleteState }

  // 제목(공간명) 구성
  const placeTitle = state?.placeName ?? state?.buildingText ?? '00호관 00층 00호'

  // 방문 시각 표기 (없으면 지금으로 fallback)
  const visitDate = state?.visitAt ? new Date(state.visitAt) : new Date()
  const dateText = format(visitDate, 'M월 d일 EEE', { locale: ko }) // 예: 7월 25일 금
  const timeText = format(visitDate, 'a h시', { locale: ko }) // 예: 오후 3시
    .replace('AM', '오전')
    .replace('PM', '오후')
  const countText = state?.visitCount ? `${state.visitCount}번째 방문` : undefined

  const isFavorite = !!state?.isFavorite

  return (
    <Page>
      {/* 1) 제목 + 즐겨찾기(별) */}
      <PlaceTitle
        title={placeTitle}
        isFavorite={isFavorite}
        onToggleFavorite={() => {
          // TODO: 즐겨찾기 토글 API 연동
          // 예시) await api.toggleFavorite(placeId)
          // 상태 보관이 필요하면 나중에 recoil/zustand/context or 서버 fetch로 반영
          console.log('toggle favorite')
        }}
      />

      {/* 2) 비공개 안내 */}
      <PrivateTip />

      {/* 3) 날짜/요일/시각/방문차수 + 내역삭제 */}
      <VisitMetaRow
        dateText={dateText}
        timeText={timeText}
        countText={countText}
        onDelete={() => {
          // TODO: 내역삭제 API
          // 삭제 성공 시 이동 정책 예시:
          //   - 목록으로: nav('/visits', { replace: true })
          //   - 작성 페이지로: nav('/place/review', { replace: true })
          console.log('내역 삭제')
        }}
      />

      {/* 4) CTA: 이용 후기 수정하기
          이번 케이스는 "사진/영상 + 코멘트 없음"이므로 수정 화면으로 진입 시 빈 값 전달 */}
      <CTA>
        <PrimaryButton
          label="✏️ 이용 후기 수정하기"
          onClick={() =>
            nav('/place/review/edit', {
              state: {
                from: 'visit-complete',
                placeName: state?.placeName,
                buildingText: state?.buildingText,
                visitAt: visitDate.toISOString(),
                // 비어 있는 초기값을 명시적으로 넘겨줌
                medias: [],
                comment: '',
              },
            })
          }
        />
      </CTA>

      {/* 5) 하단 탭바 여백 (앱에 바텀 네비가 있다면 높이 맞춰 조절) */}
      <BottomSpacer />
    </Page>
  )
}

/* ---------- styled ---------- */
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
