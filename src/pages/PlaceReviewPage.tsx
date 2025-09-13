// 리뷰등록페이지
import type React from 'react' // React.MouseEvent 타입용 (JSX 자동임포트와 별개)
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import CommonModal from '@/components/Common/CommonModal'
import CloseHeader from '@/components/PlaceReview/Btns/CloseBtn'
import NextBtn from '@/components/PlaceReview/Btns/NextBtn'
import PrevNextBtn from '@/components/PlaceReview/Btns/PrevNextBtn'
import DateTimeSelector from '@/components/PlaceReview/DateTimeSelector'
import PlaceCard from '@/components/PlaceReview/PlaceCard'
import ReviewKeywordSelector from '@/components/PlaceReview/ReviewKeywordSelector'
import ReviewInput from '@/components/PlaceReview/ReviewRequest/ReviewInput'
import VisitHistory from '@/components/PlaceReview/ReviewRequest/VisitHistory'

type TimeVal = { hour: number; minute: number }
type Step = 'date' | 'keyword' | 'media'

type RestoreState = {
  step?: 'date' | 'keyword' | 'media'
  visitAt?: string
  keywords?: string[]
  noKeyword?: boolean
  mediaUrls?: string[] // 사진(문자열 경로를 넘긴 경우)
  comment?: string
}

export const Page = styled.main`
  min-height: 100dvh;
  background: #f8f9fe;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 12px 120px;
`

export const Container = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const RaiseBottomBarZ = createGlobalStyle`
  :root { --z-bottom-bar: 100; }
`

export const StickyBottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 560px;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
  z-index: 10;
`

const PlaceReviewPage = () => {
  const navigate = useNavigate()
  const { state: restore } = useLocation() as { state?: RestoreState }

  const handleClose = () => {
    navigate(-1)
  }

  const images = useMemo(() => ['/장소사진더미.svg', '/장소사진더미.svg', '/장소사진더미.svg'], [])
  const buildingText = '00호관 101호'
  const placeName = '공간이름'
  const visitCount = 1

  // 방문 일시
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<TimeVal | null>(null)
  const finalDateTime = useMemo(() => {
    if (!selectedDate || !selectedTime) return null
    const d = new Date(selectedDate)
    d.setHours(selectedTime.hour, selectedTime.minute, 0, 0)
    return d
  }, [selectedDate, selectedTime])

  // 스텝 전환
  // const [step, setStep] = useState<Step>('date')
  const [step, setStep] = useState<Step>(restore?.step ?? 'date')

  // 키워드
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set())
  const [noKeyword, setNoKeyword] = useState(false)

  const handleKeywordsChange = (next: Set<string> | string[]) => {
    setSelectedKeywords(new Set(Array.isArray(next) ? next : [...next]))
  }
  const handleNoKeywordChange = (next: boolean) => {
    setNoKeyword(next)
    setSelectedKeywords(new Set()) // 다시 눌러도 초기화
  }

  const canGoNextFromKeyword = Boolean(finalDateTime) && (noKeyword || selectedKeywords.size >= 1)

  const [photos, setPhotos] = useState<(File | string)[]>([])
  const [comment, setComment] = useState('')

  // 모달 on/off (리뷰 비어있을 때)
  const [showEmptyModal, setShowEmptyModal] = useState(false)

  useEffect(() => {
    if (!restore) return

    // 날짜/시간
    if (restore.visitAt) {
      const d = new Date(restore.visitAt)
      setSelectedDate(d)
      setSelectedTime({ hour: d.getHours(), minute: d.getMinutes() })
    }

    // 키워드/노키워드
    if (restore.keywords) setSelectedKeywords(new Set(restore.keywords))
    if (typeof restore.noKeyword === 'boolean') setNoKeyword(restore.noKeyword)

    // 사진/코멘트
    if (restore.mediaUrls) {
      setPhotos(restore.mediaUrls)
    }
    if (typeof restore.comment === 'string') setComment(restore.comment)

    // 마지막으로 요청된 step으로 이동
    if (restore.step) setStep(restore.step)
  }, [restore])

  // 등록 버튼(미디어 스텝)
  const handleRegister = () => {
    if (!finalDateTime) return
    const noMedia = photos.length === 0
    const noComment = comment.trim() === ''
    if (noMedia && noComment) {
      setShowEmptyModal(true) // 🔹 네 모달 열기
      return
    }
    submitWithReview()
  }

  // 리뷰 포함 등록
  const submitWithReview = () => {
    if (!finalDateTime) return

    const uploadedUrls = photos.map((p) => (typeof p === 'string' ? p : URL.createObjectURL(p)))

    console.log('리뷰 포함 등록', {
      visitAt: finalDateTime.toISOString(),
      keywords: Array.from(selectedKeywords),
      noKeyword,
      comment,
      medias: photos,
    })

    navigate('/visit/complete', {
      state: {
        placeName,
        buildingText,
        visitAt: finalDateTime.toISOString(),
        visitCount,
        isFavorite: false,
        keywords: Array.from(selectedKeywords),
        noKeyword,
        mediaUrls: uploadedUrls,
        comment,
      },
      replace: true,
    })
  }

  // 방문만 기록
  const submitVisitOnly = () => {
    if (!finalDateTime) return

    console.log('방문만 기록', {
      visitAt: finalDateTime.toISOString(),
      keywords: Array.from(selectedKeywords),
      noKeyword,
      comment: '',
    })

    navigate('/visit/complete', {
      state: {
        placeName,
        buildingText,
        visitAt: finalDateTime.toISOString(),
        visitCount,
        isFavorite: false,
        keywords: Array.from(selectedKeywords),
        noKeyword,
        mediaUrls: [],
        comment: '',
      },
      replace: true,
    })
  }

  // 모달 버튼들
  const handleVisitOnly = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setShowEmptyModal(false)
    submitVisitOnly()
  }
  const handleCancel = () => setShowEmptyModal(false)

  return (
    <Page>
      <RaiseBottomBarZ />

      <Container>
        <CloseHeader onClose={handleClose} />

        {step === 'date' && (
          <>
            <PlaceCard buildingText={buildingText} placeName={placeName} images={images} />

            <DateTimeSelector
              valueDate={selectedDate}
              valueTime={selectedTime}
              onChangeDate={setSelectedDate}
              onChangeTime={setSelectedTime}
            />

            <StickyBottom>
              <NextBtn
                disabled={!finalDateTime}
                onClick={() => {
                  if (!finalDateTime) return
                  setStep('keyword')
                }}
              />
            </StickyBottom>
          </>
        )}

        {step === 'keyword' && (
          <>
            <PlaceCard buildingText={buildingText} placeName={placeName} images={images} />

            <ReviewKeywordSelector
              selected={selectedKeywords}
              onChange={handleKeywordsChange}
              noKeyword={noKeyword}
              onNoKeywordChange={handleNoKeywordChange}
              minPick={1}
              maxPick={3}
              valueKey="label"
            />

            <StickyBottom>
              <PrevNextBtn
                onPrev={() => setStep('date')}
                onNext={() => {
                  if (canGoNextFromKeyword) setStep('media')
                }}
                nextDisabled={!canGoNextFromKeyword}
                prevLabel="이전"
                nextLabel="다음"
              />
            </StickyBottom>
          </>
        )}

        {step === 'media' && (
          <>
            <VisitHistory
              placeName="공간이름"
              visitAt={finalDateTime?.toISOString()}
              visitCount={1}
              keywords={[...selectedKeywords]}
              noKeyword={noKeyword}
            />

            <ReviewInput
              photos={photos}
              comment={comment}
              onChange={(p, c) => {
                setPhotos(p)
                setComment(c)
              }}
            />

            {/* 버튼은 NavBar '위'에 고정 */}
            <PrevNextBtn
              onPrev={() => setStep('keyword')}
              onNext={handleRegister}
              prevLabel="이전"
              nextLabel="등록"
              fixed
            />
          </>
        )}
      </Container>

      {/* <ConfirmModal open={showEmptyModal} onCancel={handleCancel} onVisitOnly={handleVisitOnly} /> */}
      <CommonModal
        isOpen={showEmptyModal}
        title="" // 제목은 비워두면 안 보임
        content={
          <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
            작성된 리뷰 내용이 없습니다.
            <br />
            방문만 기록하시겠습니까?
          </div>
        }
        confirmText="방문만 기록"
        cancelText="취소"
        onConfirm={handleVisitOnly}
        onCancel={handleCancel}
      />
    </Page>
  )
}

export default PlaceReviewPage
