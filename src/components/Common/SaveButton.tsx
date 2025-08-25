import styled from 'styled-components'

import savedIcon from '../../assets/savedIcon.svg'
import saveIcon from '../../assets/saveIcon.svg'

/**
 * isSaved값에 따라 저장/저장X 아이콘 표시
 * 버튼 동작은 부모 컴포넌트에서
 */

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
  isSaved?: boolean // 저장 상태
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
