import { useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/Common/BackHeader.tsx'
import BottomNavBar from '../components/Common/BottomNavBar.tsx'
import PhotoUploadButton from '../components/Register/PhotoUploadButton.tsx'
import RegisterBox from '../components/Register/RegisterBox.tsx'
import { useViewportVH } from '../hooks/useViewportVH'

const RegisterWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
`

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 30px;
`
const PhotoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: calc(100% - 60px);
  margin-bottom: 16px;
`
const Description = styled.span`
  font-size: 11px;
  color: black;
  width: calc(100% - 64px);
  margin: 0;
`
const Register = () => {
  useViewportVH()
  const [tab, setTab] = useState<'find' | 'map' | 'me'>('find')

  const handlePhotoChange = (file: File) => {
    console.log('파일', file) //서버 업로드 처리 해야됨
  }

  return (
    <RegisterWrapper className="app">
      <HeaderWrapper className={'sticky-top'}>
        <BackHeader title={'프로필 설정'} />
      </HeaderWrapper>
      <Content className="app-content">
        <PhotoWrapper>
          <PhotoUploadButton onChange={handlePhotoChange} />
        </PhotoWrapper>
        <Description>* 표시는 필수 입력 항목입니다.</Description>

        <RegisterBox />
      </Content>
      <div className={'bottom-gap'} />
      <BottomNavBar activeKey={tab} onChange={(key) => setTab(key as 'find' | 'map' | 'me')} />
    </RegisterWrapper>
  )
}

export default Register
