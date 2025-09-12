import styled from 'styled-components'

import BackHeader from '@/components/Common/BackHeader.tsx'
import LoginBox from '@/components/LoginPage/LoginBox'
import { useViewportVH } from '@/hooks/useViewportVH'

const LoginPageWrapper = styled.div`
  background: white;
  position: relative;
`
const HeaderWrapper = styled.div`
  width: 100%;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const LoginPage = () => {
  useViewportVH()

  return (
    <LoginPageWrapper className="app">
      <HeaderWrapper className={'sticky-top'}>
        <BackHeader title="로그인" />
      </HeaderWrapper>
      <Content className="app-content">
        <LoginBox />
      </Content>
      <div className={'bottom-gap'} />
    </LoginPageWrapper>
  )
}

export default LoginPage
