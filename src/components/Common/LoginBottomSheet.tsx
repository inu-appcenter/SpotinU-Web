import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import mascot from '@/assets/횃불이.png'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClickLogin: () => void
  title?: string
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
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`
const SheetWrapper = styled.div<{ translateY: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transform: ${({ translateY }) => `translateY(${translateY}px)`};
  transition: transform 0.2s ease-out;
`

const Sheet = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #eeeeee;
  border-radius: 20px 20px 0 0;
  padding: 8px 14px 0;
  animation: ${slideUp} 0.5s ease-out forwards;
  position: relative;
`
// 상단 전체 드래그 영역
const DragZone = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  touch-action: none;
`

const GrayBar = styled.div`
  width: 60px;
  height: 5px;
  background: #d9d9d9;
  border-radius: 6px;
  margin: 0 auto 35px;
`

const Title = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: 20px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MascotImg = styled.img`
  width: 150px;
  height: 160px;
  margin-left: -20px;
  object-fit: contain;
  image-rendering: auto;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  gap: 24px;
  flex: 1;
`

const LoginButton = styled.button`
  padding: 8px;
  background-color: #073b7b;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 30px;
`

const NoLoginButton = styled.button`
  padding: 6px;
  background-color: white;
  color: #073b7b;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #073b7b;
  border-radius: 30px;
`

// 컴포넌트
const LoginBottomSheet = ({
  isOpen,
  onClose,
  onClickLogin,
  title = '로그인 후 이용 가능한 서비스입니다.\n지금 로그인하시겠어요?',
}: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [dragStartY, setDragStartY] = useState<number | null>(null)
  const [translateY, setTranslateY] = useState(0)

  // 열고 닫는 애니메이션 감지
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTranslateY(0) // 다시 열릴 때 초기화
      setDragStartY(null)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'visible'
    }
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  if (!isVisible) return null

  // 터치/드래그 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY === null) return
    const diff = e.touches[0].clientY - dragStartY
    if (diff > 0) {
      e.preventDefault() // 스크롤 개입 막기
      setTranslateY(diff)
    }
  }

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
      <SheetWrapper translateY={translateY}>
        <Sheet>
          <DragZone
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <GrayBar />
          <Title>{title}</Title>
          <Content>
            <MascotImg src={mascot} alt="횃불이" />
            <ButtonGroup>
              <LoginButton onClick={onClickLogin}>로그인 하기</LoginButton>
              <NoLoginButton onClick={onClose}>나중에 할게요</NoLoginButton>
            </ButtonGroup>
          </Content>
        </Sheet>
      </SheetWrapper>
    </>
  )
}

export default LoginBottomSheet
