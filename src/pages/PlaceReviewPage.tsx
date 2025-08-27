// 리뷰등록페이지
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import CloseHeader from '../components/PlaceReview/Btns/CloseBtn'
import NextBtn from '../components/PlaceReview/Btns/NextBtn'
import PrevNextBtn from '../components/PlaceReview/Btns/PrevNextBtn'
import ConfirmModal from '../components/PlaceReview/ConfirmModal'
import DateTimeSelector from '../components/PlaceReview/DateTimeSelector'
import PlaceCard from '../components/PlaceReview/PlaceCard'
import ReviewKeywordSelector from '../components/PlaceReview/ReviewKeywordSelector'
import ReviewInput from '../components/PlaceReview/ReviewRequest/ReviewInput'
import VisitHistory from '../components/PlaceReview/ReviewRequest/VisitHistory'

type TimeVal = { hour: number; minute: number }
type Step = 'date' | 'keyword' | 'media'

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
  :root { --z-bottom-bar: 100; }  /* 필요하면 90~100으로 */
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

export default function PlaceReviewPage() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/place/detail') // PlaceDetail 페이지로 이동
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
  const [step, setStep] = useState<Step>('date')

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

  const [photos, setPhotos] = useState<File[]>([])
  const [comment, setComment] = useState('')

  //  모달 on/off
  const [showEmptyModal, setShowEmptyModal] = useState(false)

  // 등록 버튼을 눌렀을 때(미디어 스텝에서 PrevNextBtn.onNext로 연결함)
  const handleRegister = () => {
    if (!finalDateTime) return
    const noMedia = photos.length === 0
    const noComment = comment.trim() === ''
    if (noMedia && noComment) {
      setShowEmptyModal(true) // 등록 모달 띄움
      return
    }

    submitWithReview() //내용이 있는경우
  }

  const submitWithReview = () => {
    if (!finalDateTime) return

    const uploadedUrls = photos.map((f) => URL.createObjectURL(f)) // 미리보기 (사진)

    //  API 확인해야됨
    console.log('리뷰 포함 등록', {
      visitAt: finalDateTime.toISOString(),
      keywords: Array.from(selectedKeywords),
      noKeyword,
      comment,
      medias: photos,
    })

    //  내용 있는 완료 화면으로
    navigate('/visit/complete', {
      state: {
        placeName,
        buildingText,
        visitAt: finalDateTime.toISOString(),
        visitCount,
        isFavorite: false,
        keywords: Array.from(selectedKeywords),
        noKeyword,
        mediaUrls: uploadedUrls, // 서버 다시 봐야됨
        comment,
      },
      replace: true,
    })
  }

  const submitVisitOnly = () => {
    if (!finalDateTime) return

    console.log('방문만 기록', {
      visitAt: finalDateTime.toISOString(),
      keywords: Array.from(selectedKeywords),
      noKeyword,
      comment: '',
    })

    //  방문만 완료로
    navigate('/visit/complete', {
      state: {
        placeName,
        buildingText,
        visitAt: finalDateTime.toISOString(),
        visitCount,
        isFavorite: false,
        keywords: Array.from(selectedKeywords),
        noKeyword,
        mediaUrls: [], // 방문만이므로 비움
        comment: '',
      },
      replace: true,
    })
  }

  // 모달에서 호출
  const handleVisitOnly = (e?: React.MouseEvent) => {
    e?.preventDefault() //  submit 방지용임
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
                  setStep('keyword') // 날짜/시간 완료 후에만 키워드 화면으로
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
              valueKey="label" // label값 사용 (깨끗해요 선택 -> 깨끗해요로 넘어감)
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
              // onNext={submit}
              onNext={handleRegister}
              prevLabel="이전"
              nextLabel="등록"
              fixed // ← PrevNextBtn에 추가한 prop
            />
          </>
        )}
      </Container>

      <ConfirmModal open={showEmptyModal} onCancel={handleCancel} onVisitOnly={handleVisitOnly} />
    </Page>
  )
}
