import { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'

type PlaceLite = {
  id: string
  title: string
  subtitle?: string
  building?: string
  distanceText?: string
  imageUrl?: string
  typeText?: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  place?: PlaceLite | null
  onClickPrimary?: (id: string) => void
  primaryLabel?: string
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Dimmed = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
`

const SheetWrap = styled.div<{ translateY: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transform: ${({ translateY }) => `translateY(${translateY}px)`};
  transition: transform 0.18s ease-out;
`

const Sheet = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #fff; /* 흰색 배경 */
  border-radius: 18px 18px 0 0;
  padding: 10px 14px 14px;
  box-shadow: 0 -12px 28px rgba(0, 0, 0, 0.18);
  animation: ${slideUp} 280ms ease-out forwards;
  position: relative;
`

// 상단 어디든 잡히도록 전체 폭 드래그 존
const DragZone = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  touch-action: none;
`

const Handle = styled.div`
  width: 48px;
  height: 5px;
  background: #e5e7eb;
  border-radius: 999px;
  margin: 6px auto 12px;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  align-items: center;
`

const Thumb = styled.img`
  width: 110px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  background: #f3f4f6;
`

const Title = styled.h3`
  margin: 0 0 4px 0;
  font-size: 18px;
  line-height: 1.25;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #4b5563;
  font-size: 13px;
`

const Footer = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
`

const PrimaryBtn = styled.button`
  min-width: 110px;
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 0;
  color: #fff;
  background: #073b7b;
  font-weight: 600;
  font-size: 15px;
`

const MapBottomSheet = ({
  isOpen,
  onClose,
  place,
  onClickPrimary,
  primaryLabel = '자세히 보기',
}: Props) => {
  const visible = useMemo(() => isOpen && !!place, [isOpen, place])

  const [dragStartY, setDragStartY] = useState<number | null>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    if (visible) {
      setTranslateY(0)
      setDragStartY(null)
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [visible])

  if (!visible || !place) return null

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY)
  }

  // 터치 이동 (아래로만)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY === null) return
    const currY = e.touches[0].clientY
    const diff = currY - dragStartY
    if (diff > 0) {
      e.preventDefault() // 페이지 스크롤 방지
      setTranslateY(diff)
    }
  }

  // 터치 종료
  const handleTouchEnd = () => {
    const THRESHOLD = 100
    if (translateY > THRESHOLD) {
      setTranslateY(0)
      onClose()
    } else {
      setTranslateY(0)
    }
    setDragStartY(null)
  }

  return (
    <>
      <Dimmed onClick={onClose} />
      <SheetWrap translateY={translateY}>
        <Sheet role="dialog" aria-modal="true" aria-label={place.title}>
          <DragZone
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <Handle />
          <Row>
            {place.imageUrl ? <Thumb src={place.imageUrl} alt={place.title} /> : <Thumb as="div" />}
            <div>
              <Title>{place.title}</Title>
              <Meta>
                {place.subtitle && <span>{place.subtitle}</span>}
                {place.building && <span>{place.building}</span>}
                {place.distanceText && <span>{place.distanceText}</span>}
                {place.typeText && <span>{place.typeText}</span>}
              </Meta>
            </div>
          </Row>
          <Footer>
            <PrimaryBtn onClick={() => place && onClickPrimary?.(place.id)}>
              {primaryLabel}
            </PrimaryBtn>
          </Footer>
        </Sheet>
      </SheetWrap>
    </>
  )
}

export default MapBottomSheet
