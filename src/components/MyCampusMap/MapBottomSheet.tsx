import { useEffect, useMemo } from 'react'
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
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`

const Dimmed = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
`

const SheetWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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

export default function MapBottomSheet({
  isOpen,
  onClose,
  place,
  onClickPrimary,
  primaryLabel = '자세히 보기',
}: Props) {
  const visible = useMemo(() => isOpen && !!place, [isOpen, place])

  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [visible])

  if (!visible || !place) return null

  return (
    <>
      <Dimmed onClick={onClose} />
      <SheetWrap>
        <Sheet role="dialog" aria-modal="true" aria-label={place.title}>
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
