// 즐겨찾기 + [공간이름], 호관, 층, 호
import styled from 'styled-components'

type Props = {
  label?: string
  buildingText?: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
  rightSlot?: React.ReactNode
  hideLabel?: boolean
}

const PlaceTitle = ({
  label = '[공간 이름]',
  buildingText = '00호관 00층 00호',
  onToggleFavorite,
  rightSlot,
  hideLabel = false,
}: Props) => {
  return (
    <Wrap>
      <Left>
        {!hideLabel && <Label>{label}</Label>}
        <Title>{buildingText}</Title>
      </Left>
      <Right>
        <StarBtn onClick={onToggleFavorite} aria-label="즐겨찾기" />
        {rightSlot /*  외부에서 넣은 버튼 */}
      </Right>
    </Wrap>
  )
}

export default PlaceTitle

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 10px;
  margin-top: 28px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  font-size: 19px;
  color: #000000ff;
  font-weight: 800;
`

const Title = styled.h1`
  font-size: 19px;
  font-weight: 800;
  margin: 0;
`

const Right = styled.div``

const StarBtn = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
`
