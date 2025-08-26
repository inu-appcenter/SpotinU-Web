import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type PlaceCardProps = {
  buildingText: string // 몇 호관 몇 층 몇 호
  placeName: string // [공간이름]
  guideText?: string // 방문 일시를 확인해 주세요!
  images: string[] // 이미지 여러 장
  imgHeight?: number // 기본 190
}

export default function PlaceCard({
  buildingText,
  placeName,
  guideText = '방문 일시를 확인해 주세요!',
  images,
  imgHeight = 190,
}: PlaceCardProps) {
  const [index, setIndex] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth)
        setIndex((prev) => (prev === i ? prev : i))
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  // 점 클릭 이동 함수 유지
  const go = (i: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'auto' })
  }

  return (
    <Card>
      <Header>
        <Title>{buildingText}</Title>
        <Sub>[{placeName}]</Sub>
        <Guide>{guideText}</Guide>
      </Header>

      <Frame>
        <Scroller ref={scrollerRef}>
          {images.map((src, i) => (
            <Slide key={i}>
              <Img src={src} alt={`${placeName}-${i + 1}`} $h={imgHeight} />
            </Slide>
          ))}
        </Scroller>

        {images.length > 1 && (
          <Dots>
            {images.map((_, i) => (
              <Dot
                key={i}
                $active={i === index}
                aria-label={`slide ${i + 1}`}
                onClick={() => go(i)}
              />
            ))}
          </Dots>
        )}
      </Frame>
    </Card>
  )
}

const Card = styled.section`
  background: #f4f6fb;
  border-radius: 16px;
  padding: 18px 14px;
  max-width: 420px;
  margin: 0 auto;

  contain: paint; /* ← 카드 영역만 페인트 */
  backface-visibility: hidden;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 10px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111;
`

const Sub = styled.h3`
  margin: 2px 0 6px;
  font-size: 20px;
  font-weight: 800;
  color: #111;
`

const Guide = styled.p`
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #111;
`

const Frame = styled.div`
  position: relative;
  border-radius: 14px;
  background: #e0e3ea;
  padding: 10px 8px 16px; /* 아래 점 공간 */
`

const Scroller = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;
  border-radius: 12px;

  -webkit-overflow-scrolling: touch; /* iOS 관성 스크롤 */
  will-change: scroll-position; /* 스크롤 최적화 힌트 */

  &::-webkit-scrollbar {
    height: 0;
  }
`

const Slide = styled.div`
  scroll-snap-align: center;
  min-width: 100%;
  padding: 0 2px;
`

const Img = styled.img<{ $h: number }>`
  width: 100%;
  height: ${({ $h }) => $h}px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
`

const Dots = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  display: flex;
  justify-content: center;
  gap: 6px;
`

const Dot = styled.button<{ $active?: boolean }>`
  width: ${({ $active }) => ($active ? 9 : 7)}px;
  height: ${({ $active }) => ($active ? 9 : 7)}px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#c2410c' : 'rgba(0,0,0,0.3)')};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
`
// import { memo, useEffect, useRef, useState } from 'react'
// import styled from 'styled-components'

// type PlaceCardProps = {
//   buildingText: string // 몇 호관 몇 층 몇 호
//   placeName: string // [공간이름]
//   guideText?: string // 기본: "방문 일시를 확인해 주세요!"
//   images: string[] // 이미지 여러 장
//   imgHeight?: number // 기본 190
// }

// function PlaceCard({
//   buildingText,
//   placeName,
//   guideText = '방문 일시를 확인해 주세요!',
//   images,
//   imgHeight = 190,
// }: PlaceCardProps) {
//   const [index, setIndex] = useState(0)
//   const scrollerRef = useRef<HTMLDivElement>(null)

//   // 스크롤 인덱스 계산: 리스너 1회 등록 + rAF로 디바운스
//   useEffect(() => {
//     const el = scrollerRef.current
//     if (!el) return

//     let raf = 0
//     const onScroll = () => {
//       cancelAnimationFrame(raf)
//       raf = requestAnimationFrame(() => {
//         const i = Math.round(el.scrollLeft / el.clientWidth)
//         setIndex((prev) => (prev === i ? prev : i))
//       })
//     }

//     el.addEventListener('scroll', onScroll, { passive: true })
//     return () => {
//       cancelAnimationFrame(raf)
//       el.removeEventListener('scroll', onScroll)
//     }
//   }, [])

//   // 점 클릭 시 해당 슬라이드로 스크롤
//   const go = (i: number) => {
//     const el = scrollerRef.current
//     if (!el) return
//     el.scrollTo({ left: i * el.clientWidth, behavior: 'instant' as ScrollBehavior }) // ← 변경
//     // el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
//   }

//   return (
//     <Card>
//       <Header>
//         <Title>{buildingText}</Title>
//         <Sub>[{placeName}]</Sub>
//         <Guide>{guideText}</Guide>
//       </Header>

//       <Frame>
//         <Scroller ref={scrollerRef}>
//           {images.map((src, i) => (
//             <Slide key={src}>
//               <Img
//                 src={src}
//                 alt={`${placeName}-${i + 1}`}
//                 $h={imgHeight}
//                 loading="eager"
//                 decoding="async"
//               />
//             </Slide>
//           ))}
//         </Scroller>

//         {images.length > 1 && (
//           <Dots>
//             {images.map((_, i) => (
//               <Dot
//                 key={`dot-${i}`}
//                 $active={i === index}
//                 aria-label={`slide ${i + 1}`}
//                 onClick={() => go(i)}
//               />
//             ))}
//           </Dots>
//         )}
//       </Frame>
//     </Card>
//   )
// }

// export default memo(PlaceCard)

// /* ================= styled-components ================= */

// const Card = styled.section`
//   background: #f4f6fb;
//   border-radius: 16px;
//   padding: 18px 14px;
//   max-width: 420px;
//   margin: 0 auto;

//   /* 깜빡임 완화 */
//   contain: paint;
//   backface-visibility: hidden;
//   transform: translateZ(0);
// `

// const Header = styled.header`
//   text-align: center;
//   margin-bottom: 10px;
// `

// const Title = styled.h2`
//   margin: 0;
//   font-size: 20px;
//   font-weight: 800;
//   color: #111;
// `

// const Sub = styled.h3`
//   margin: 2px 0 6px;
//   font-size: 20px;
//   font-weight: 800;
//   color: #111;
// `

// const Guide = styled.p`
//   margin: 0 0 10px;
//   font-size: 16px;
//   font-weight: 700;
//   color: #111;
// `

// const Frame = styled.div`
//   position: relative;
//   border-radius: 14px;
//   background: #e0e3ea;
//   padding: 10px 8px 16px; /* 아래 점 공간 */
//   will-change: transform; /* 페인트 힌트 */
// `

// const Scroller = styled.div`
//   overflow-x: auto;
//   display: flex;
//   border-radius: 12px;

//   -webkit-overflow-scrolling: touch; /* iOS 관성 스크롤 */
//   will-change: scroll-position; /* 스크롤 최적화 */
//   overscroll-behavior: contain; /* 바운스/버블링 억제 */
//   scroll-snap-stop: always; /* 스냅 중간 깜빡임 완화 */

//   &::-webkit-scrollbar {
//     height: 0;
//   }
// `

// const Slide = styled.div`
//   scroll-snap-align: center;
//   min-width: 100%;
//   padding: 0 2px;
// `

// const Img = styled.img<{ $h: number }>`
//   width: 100%;
//   height: ${({ $h }) => $h}px;
//   object-fit: cover;
//   border-radius: 12px;
//   display: block;

//   /* 깜빡임 완화 */
//   backface-visibility: hidden;
//   transform: translateZ(0);
//   will-change: opacity, transform;
// `

// const Dots = styled.div`
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 6px;
//   display: flex;
//   justify-content: center;
//   gap: 6px;
// `

// const Dot = styled.button<{ $active?: boolean }>`
//   width: ${({ $active }) => ($active ? 9 : 7)}px;
//   height: ${({ $active }) => ($active ? 9 : 7)}px;
//   border-radius: 50%;
//   background: ${({ $active }) => ($active ? '#c2410c' : 'rgba(0,0,0,0.3)')};
//   border: none;
//   cursor: pointer;

//   /* 필요한 속성만 전환해 미세 깜빡임 억제 */
//   transition: opacity 0.15s ease;
//   opacity: ${({ $active }) => ($active ? 1 : 0.8)};
// `
///////////////

//////////
// useEffect(() => { 두번째
//   const el = scrollerRef.current
//   if (!el) return

//   let raf = 0
//   const onScroll = () => {
//     cancelAnimationFrame(raf)
//     raf = requestAnimationFrame(() => {
//       const i = Math.round(el.scrollLeft / el.clientWidth)
//       // 값이 같으면 setState 안 함 → 불필요 리렌더 방지
//       setIndex((prev) => (prev === i ? prev : i))
//     })
//   }

//   el.addEventListener('scroll', onScroll, { passive: true })
//   return () => {
//     cancelAnimationFrame(raf)
//     el.removeEventListener('scroll', onScroll)
//   }
// }, []) // ← 의존성 비움

// 맨 처음
//   useEffect(() => {
//     const el = scrollerRef.current
//     if (!el) return
//     const onScroll = () => {
//       const i = Math.round(el.scrollLeft / el.clientWidth)
//       if (i !== index) setIndex(i)
//     }
//     el.addEventListener('scroll', onScroll, { passive: true })
//     return () => el.removeEventListener('scroll', onScroll)
//   }, [index])

// const go = (i: number) => {
//   const el = scrollerRef.current
//   if (!el) return
//   el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
// }
