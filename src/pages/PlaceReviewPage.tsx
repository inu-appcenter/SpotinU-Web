// 리뷰등록페이지
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import NextBtn from '../components/PlaceReview/BottomBtns/NextBtn'
import PrevNextBtn from '../components/PlaceReview/BottomBtns/PrevNextBtn'
import ConfirmModal from '../components/PlaceReview/ConfirmModal'
import DateTimeSelector from '../components/PlaceReview/DateTimeSelector'
import ReviewKeywordSelector from '../components/PlaceReview/ReviewKeywordSelector'
import ReviewInput from '../components/PlaceReview/ReviewRequest/ReviewInput'
import VisitHistory from '../components/PlaceReview/ReviewRequest/VisitHistory'

type TimeVal = { hour: number; minute: number }
type Step = 'date' | 'keyword' | 'media'

const Page = styled.main`
  min-height: 100dvh;
  background: #f8f9fe;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 12px 120px;
`

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CardPlaceholder = styled.div`
  height: 200px;
  background: #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`

const RaiseBottomBarZ = createGlobalStyle`
  :root { --z-bottom-bar: 100; }  /* 필요하면 90~100으로 */
`

const StickyBottom = styled.div`
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

  const selectedPlace = { name: '공간이름', buildingText: '00호관 00층 00호' }
  const visitCount = 1 // 서버에 맞게 다시 변경해야됨

  const placeName = selectedPlace?.name ?? '00호관 00층 00호'
  const buildingText = selectedPlace?.buildingText ?? '00호관 00층 00호'

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
        keywords: [], // 방문만이므로 비움
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
        {step === 'date' && (
          <>
            <CardPlaceholder>PlaceCard 자리</CardPlaceholder>
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
            <CardPlaceholder>PlaceCard 자리</CardPlaceholder>

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

// // 장소 리뷰 페이지
// import { useMemo, useState } from 'react'
// import styled from 'styled-components'

// // import PlaceCard from '../components/PlaceReview/PlaceCard'
// import NextBtn from '../components/PlaceReview/BottomBtns/NextBtn'
// import PrevNextBtn from '../components/PlaceReview/BottomBtns/PrevNextBtn'
// import DateTimeSelector from '../components/PlaceReview/DateTimeSelector'
// import ReviewKeywordSelector from '../components/PlaceReview/ReviewKeywordSelector'

// // ReviewRequest

// type TimeVal = { hour: number; minute: number }

// const Page = styled.main`
//   min-height: 100dvh;
//   background: #f3f5f7;
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
//   padding: 16px 12px 32px;
// `

// const Container = styled.div`
//   width: 100%;
//   max-width: 560px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `

// const CardPlaceholder = styled.div`
//   height: 200px;
//   background: #eee;
//   border-radius: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #666;
// `

// export default function PlaceReviewPage() {
//   // PlaceCard컴포넌트 코드임

//   // const { list, loading } = usePlaces()
//   // const place = list[0]
//   // if (loading || !place) return null // 얘네 지우니까 깜빡임이 사라지네?????????????????? 니가 문제냐????
//   // const images = [place.imageUrl, `${place.imageUrl}?v=2`, `${place.imageUrl}?v=3`]

//   const [selectedDate, setSelectedDate] = useState<Date | null>(null)
//   const [selectedTime, setSelectedTime] = useState<TimeVal | null>(null)

//   const finalDateTime = useMemo(() => {
//     if (!selectedDate || !selectedTime) return null
//     const d = new Date(selectedDate)
//     d.setHours(selectedTime.hour, selectedTime.minute, 0, 0)
//     return d
//   }, [selectedDate, selectedTime])

//   // 컴포넌트 내부 상태 추가
//   const [showKeywordStep, setShowKeywordStep] = useState(false)
//   const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set())
//   const [noKeyword, setNoKeyword] = useState(false)

//   // 2단계에서 '다음(등록)' 활성 조건 (예: 키워드 최소 1개 또는 '없어요' 체크)
//   const canSubmit = noKeyword || selectedKeywords.size >= 1

//   return (
//     <>
//       <Page>
//         {/* <PlaceCard
//           buildingText={`${place.building} 101호`}
//           placeName={place.title}
//           images={images}
//         /> */}
//         {/* <div style={{ height: 200, width: 500, background: '#eee', borderRadius: 12 }}>
//           PlaceCard자리
//         </div>   */}

//         <Container>
//           <CardPlaceholder>PlaceCard 자리</CardPlaceholder>

//           <DateTimeSelector
//             valueDate={selectedDate}
//             valueTime={selectedTime}
//             onChangeDate={(d) => setSelectedDate(d)} // 달력 외 화면 클릭 시 자동 저장
//             onChangeTime={(t) => setSelectedTime(t)}
//           />
//           {showKeywordStep && (
//             <ReviewKeywordSelector
//               selected={selectedKeywords}
//               onChange={setSelectedKeywords}
//               noKeyword={noKeyword}
//               onNoKeywordChange={setNoKeyword}
//               minPick={1}
//               maxPick={3}
//             />
//           )}
//         </Container>

//         {!showKeywordStep && (
//           <NextBtn
//             disabled={!finalDateTime}
//             onClick={() => {
//               if (!finalDateTime) return
//               setShowKeywordStep(true) //  키워드 단계로 전환
//             }}
//           />
//         )}

//         {/* PrevNextBtn */}
//         {showKeywordStep && (
//           <PrevNextBtn
//             onPrev={() => setShowKeywordStep(false)} //  다시 날짜/시간 단계로
//             onNext={() => {
//               if (!canSubmit) return
//               const payload = {
//                 visitAt: finalDateTime?.toISOString(),
//                 keywords: Array.from(selectedKeywords),
//                 noKeyword,
//               }
//               console.log('등록 payload:', payload)
//               // TODO: 등록 API 또는 다음 화면
//             }}
//             nextDisabled={!canSubmit}
//             prevLabel="이전"
//             nextLabel="다음"
//           />
//         )}
//       </Page>
//     </>
//   )
// }
