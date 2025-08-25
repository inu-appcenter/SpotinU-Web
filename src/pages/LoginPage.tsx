import { useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/Common/BackHeader.tsx'
import BottomNavBar from '../components/Common/BottomNavBar.tsx'
import { useViewportVH } from '../hooks/useViewportVH'

const LoginPageWrapper = styled.div`
  background: white;
`
const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
`

const LoginPage = () => {
  useViewportVH()
  const [tab, setTab] = useState<'find' | 'map' | 'me'>('find')

  return (
    <LoginPageWrapper className="app">
      <HeaderWrapper>
        <BackHeader title="로그인/회원가입" />
      </HeaderWrapper>
      <div className={'bottom-gap'} />
      <BottomNavBar activeKey={tab} onChange={(key) => setTab(key as 'find' | 'map' | 'me')} />
    </LoginPageWrapper>
  )
}

export default LoginPage
