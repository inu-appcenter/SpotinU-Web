import styled from 'styled-components'

const Root = styled.section<{ $h: number }>`
  position: relative;
  height: ${({ $h }) => $h}px;

  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  width: 100vw;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, var(--bg), transparent);
    z-index: 2;
  }
`

const Viewport = styled.div`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Slide = styled.div`
  height: 100%;
  scroll-snap-align: start;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
`
const Dot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#facc15' : '#e5e7eb')};
`

const Banner = () => {
  // 디자이너에게 포스터 images 받으면 삽입할 예정
  const images = ['/Banner/Banner1.png', '/Banner/Banner2.png', '/Banner/Banner3.png']

  return (
    <Root $h={200}>
      <Viewport>
        {images.map((src, i) => (
          <Slide key={i}>
            <Img src={src} alt={`배너-${i}`} />
          </Slide>
        ))}
      </Viewport>
      <Dots>
        {images.map((_, i) => (
          <Dot key={i} $active={i === 0} />
        ))}
      </Dots>
    </Root>
  )
}

export default Banner
