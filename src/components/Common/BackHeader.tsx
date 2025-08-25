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
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: black;
  flex: 1;
  text-align: center;
`

const BackHeader = ({ title }: Props) => {
  return (
    <HeaderWrapper>
      <Content>
        <button onClick={() => window.history.back()}>
          <ArrowLeft size={24} color={'#000000'} />
        </button>
        {title && <Title>{title}</Title>}
      </Content>
    </HeaderWrapper>
  )
}

export default BackHeader
