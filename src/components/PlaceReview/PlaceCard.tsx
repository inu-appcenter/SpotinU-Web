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
  imgHeight = 140,
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
      <Group>
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
          <Underlay />

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
      </Group>
    </Card>
  )
}

const Group = styled.div`
  position: relative;
  isolation: isolate;
`

const Underlay = styled.div`
  background: #d9d9d9;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  margin-top: -1px;
  height: var(--shade-h);
`

const Card = styled.section`
  background: transparent;
  border-radius: 16px;
  padding: 18px 14px;
  max-width: 360px;
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
  --shade-h: 44px;
  padding-bottom: var(--dot-space);
`

const Scroller = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;

  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;

  &::-webkit-scrollbar {
    height: 0;
  }
`

const Slide = styled.div`
  scroll-snap-align: center;
  min-width: 100%;
`

const Img = styled.img<{ $h: number }>`
  width: 100%;
  height: ${({ $h }) => $h}px;
  // height: ${({ $h }) => $h || 20}svh; /* 🔹 화면 높이 비율 (20% 정도) */
  object-fit: cover;

  border-top-left-radius: 12px; /* ⬅️ 위 왼쪽만 둥글게 */
  border-top-right-radius: 12px; /* ⬅️ 위 오른쪽만 둥글게 */
  border-bottom-left-radius: 0; /* ⬅️ 아래는 직각 */
  border-bottom-right-radius: 0;
  display: block;
`

const Dots = styled.div`
  position: absolute;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  gap: 6px;
  bottom: 16px;
  z-index: 2;
`

const Dot = styled.button<{ $active?: boolean }>`
  width: ${({ $active }) => ($active ? 9 : 7)}px;
  height: ${({ $active }) => ($active ? 9 : 7)}px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#FFB300' : 'rgba(255, 255, 255, 1)')};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  z-index: 2;
`
