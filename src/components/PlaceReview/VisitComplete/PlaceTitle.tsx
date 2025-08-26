// 즐겨찾기 + [공간이름], 호관, 층, 호
import styled from 'styled-components'

type Props = {
  label?: string // 기본: [공간 이름]
  title: string // 예: 00호관 00층 00호
  isFavorite?: boolean // 즐겨찾기 여부
  onToggleFavorite?: () => void
}

export default function PlaceTitle({
  label = '[공간 이름]',
  title,
  isFavorite = false,
  onToggleFavorite,
}: Props) {
  return (
    <Wrap>
      <Left>
        <Label>{label}</Label>
        <Title>{title}</Title>
      </Left>
      <Right>
        <Star
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          $active={isFavorite}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </Star>
      </Right>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px 8px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  font-size: 12px;
  color: #555;
  font-weight: 600;
  margin-bottom: 6px;
`

const Title = styled.h1`
  font-size: 16px;
  font-weight: 800;
  margin: 0;
`

const Right = styled.div``

const Star = styled.button<{ $active: boolean }>`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 22px;
  color: ${({ $active }) => ($active ? '#FFC83D' : '#c7c7c7')};
`
