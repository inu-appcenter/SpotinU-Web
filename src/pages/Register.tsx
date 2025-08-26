import { useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/Common/BackHeader.tsx'
import BottomNavBar from '../components/Common/BottomNavBar.tsx'
import RegisterBox from '../components/Register/RegisterBox.tsx'
import { useViewportVH } from '../hooks/useViewportVH'

const RegisterWrapper = styled.div`
  background: white;
  overflow-y: auto;
`

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const Register = () => {
  useViewportVH()
  const [tab, setTab] = useState<'find' | 'map' | 'me'>('find')

  return (
    <RegisterWrapper className="app">
      <HeaderWrapper className={'sticky-top'}>
        <BackHeader title={'프로필 설정'} />
      </HeaderWrapper>
      <Content className="app-content">
        <RegisterBox />
      </Content>
      <div className={'bottom-gap'} />
      <BottomNavBar activeKey={tab} onChange={(key) => setTab(key as 'find' | 'map' | 'me')} />
    </RegisterWrapper>
  )
}

export default Register
