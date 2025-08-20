import styled from 'styled-components'

import SaveIcon from '../../assets/icons/saveIcon.svg'

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

const SaveButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button onClick={onClick}>
      <Icon src={SaveIcon} alt="저장하기 버튼" />
    </Button>
  )
}

export default SaveButton
