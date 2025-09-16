import { X } from 'lucide-react'
import styled from 'styled-components'

type Props = { onClose?: () => void }

const CloseHeader = ({ onClose }: Props) => {
  return (
    <HeaderOuter>
      {' '}
      <Inner>
        {' '}
        <CloseButton onClick={onClose}>
          <X size={22} strokeWidth={1.2} color="#000" />
        </CloseButton>
      </Inner>
    </HeaderOuter>
  )
}

export default CloseHeader

const HeaderOuter = styled.header`
  flex: 0 0 auto;
  width: 100%;
  box-sizing: border-box;

  background: #f8f9fe;
`

const Inner = styled.div`
  max-width: 560px;
  height: 0px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
`

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
`
