import styled from 'styled-components'

import savedIcon from '../../assets/savedIcon.svg'
import saveIcon from '../../assets/saveIcon.svg'

const Button = styled.button`
  width: 33px;
  height: 33px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.img`
  width: 33px;
  height: 33px;
`

type Props = {
  isSaved?: boolean
  onClick?: () => void
}

const SaveButton = ({ isSaved = false, onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Icon src={isSaved ? savedIcon : saveIcon} alt="저장하기 버튼" />
    </Button>
  )
}

export default SaveButton
