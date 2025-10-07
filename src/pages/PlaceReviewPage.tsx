// 리뷰등록페이지
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
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
import { useSpot } from '@/hooks/useSpot'

type TimeVal = { hour: number; minute: number }
type Step = 'date' | 'keyword' | 'media'

type RestoreState = {
  step?: 'date' | 'keyword' | 'media'
  visitAt?: string
  keywords?: string[]
  noKeyword?: boolean
  mediaUrls?: string[]
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
  const [searchParams] = useSearchParams()
  const { state: restore } = useLocation() as { state?: RestoreState & { spotId?: number } }

  const spotId = Number(searchParams.get('spotId') ?? restore?.spotId)

  const { data: place, loading, error } = useSpot(Number.isFinite(spotId) ? spotId : null)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<TimeVal | null>(null)
  const finalDateTime = useMemo(() => {
    if (!selectedDate || !selectedTime) return null
    const d = new Date(selectedDate)
    d.setHours(selectedTime.hour, selectedTime.minute, 0, 0)
    return d
  }, [selectedDate, selectedTime])

  const [step, setStep] = useState<Step>(restore?.step ?? 'date')

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

  const [showEmptyModal, setShowEmptyModal] = useState(false)

  useEffect(() => {
    if (!restore) return
    if (restore.visitAt) {
      const d = new Date(restore.visitAt)
      setSelectedDate(d)
      setSelectedTime({ hour: d.getHours(), minute: d.getMinutes() })
    }
    if (restore.keywords) setSelectedKeywords(new Set(restore.keywords))
    if (typeof restore.noKeyword === 'boolean') setNoKeyword(restore.noKeyword)
    if (restore.mediaUrls) setPhotos(restore.mediaUrls)
    if (typeof restore.comment === 'string') setComment(restore.comment)
    if (restore.step) setStep(restore.step)
  }, [restore])

  const handleClose = () => navigate(-1)

  const handleRegister = () => {
    if (!finalDateTime) return
    const noMedia = photos.length === 0
    const noComment = comment.trim() === ''
    if (noMedia && noComment) {
      setShowEmptyModal(true)
      return
    }
    submitWithReview()
  }

  // 리뷰 포함 등록
  const submitWithReview = () => {
    if (!finalDateTime || !place) return
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
        name: place.name,
        locationDetail: place.locationDetail,
        visitAt: finalDateTime.toISOString(),

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
    if (!finalDateTime || !place) return

    console.log('방문만 기록', {
      visitAt: finalDateTime.toISOString(),
      keywords: Array.from(selectedKeywords),
      noKeyword,
      comment: '',
    })

    navigate('/visit/complete', {
      state: {
        name: place.name,
        locationDetail: place.locationDetail,
        visitAt: finalDateTime.toISOString(),

        isFavorite: false,
        keywords: Array.from(selectedKeywords),
        noKeyword,
        mediaUrls: [],
        comment: '',
      },
      replace: true,
    })
  }

  const handleVisitOnly = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setShowEmptyModal(false)
    submitVisitOnly()
  }
  const handleCancel = () => setShowEmptyModal(false)

  if (!place) {
    return <Page>장소 정보를 불러오지 못했습니다.</Page>
  }
  // 파생값(훅 아님)
  const name = place.name
  const locationDetail = place.locationDetail
  const photo = place.photos ?? []

  return (
    <Page>
      <RaiseBottomBarZ />

      {!place ? (
        <Container>
          <CloseHeader onClose={handleClose} />
          <div style={{ padding: 16 }}>
            {loading ? '장소 정보를 불러오는 중' : (error ?? '장소 정보를 불러오지 못했습니다.')}
          </div>
        </Container>
      ) : (
        <Container>
          <CloseHeader onClose={handleClose} />

          {step === 'date' && (
            <>
              <PlaceCard locationDetail={locationDetail} name={name} photo={photo} />

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
              <PlaceCard locationDetail={locationDetail} name={name} photo={photo} />

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
                name={name}
                visitAt={finalDateTime?.toISOString()}
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
      )}

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
