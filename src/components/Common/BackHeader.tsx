import { ArrowLeft } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  title?: string
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 2;
  width: 100%;
`

const Side = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
`
const BackButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  margin-right: 16px;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: black;
  text-align: center;
`

const BackHeader = ({ title }: Props) => {
  return (
    <HeaderWrapper>
      <Side>
        <BackButton onClick={() => window.history.back()}>
          <ArrowLeft size={24} color={'#000000'} />
        </BackButton>
      </Side>
      {title && <Title>{title}</Title>}
      <Side /> {/*오른쪽 공간 확보*/}
    </HeaderWrapper>
  )
}

export default BackHeader
