import styled from 'styled-components'

import { ArrowLeft } from 'lucide-react'

import SaveButton from '../Common/SaveButton.tsx'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: transparent;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const ReviewButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  color: white;
  background: #073b7b;
  border-radius: 20px;
`
const PageHeader = () => {
  return (
    <Wrapper>
      <Left>
        <button onClick={() => window.history.back()}>
          <ArrowLeft size={24} />
        </button>
      </Left>

      <Right>
        <ReviewButton>이용후기 등록</ReviewButton>
        <SaveButton />
      </Right>
    </Wrapper>
  )
}

export default PageHeader
