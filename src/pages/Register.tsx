import { useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/Common/BackHeader.tsx'
import CommonModal from '../components/Common/CommonModal.tsx'
import FormButton from '../components/Common/FormButton.tsx'
import RegisterBox from '../components/Register/RegisterBox.tsx'
import { useViewportVH } from '../hooks/useViewportVH'

const RegisterWrapper = styled.div`
  background: white
  display: flex;
  flex-direction: column;
  position: relative;
`

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 0;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 30px;
`

const Description = styled.span`
  font-size: 18px;
  color: black;
  width: calc(100% - 64px);
  margin-top: 0;
  margin-bottom: 0;
`
const Register = () => {
  useViewportVH()
  const [showModal, setShowModal] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handleSubmit = () => {
    console.log(' 회원가입 버튼 ')
  }

  return (
    <RegisterWrapper className="app">
      <HeaderWrapper className={'sticky-top'}>
        <BackHeader title={'프로필 설정'} />
      </HeaderWrapper>
      <Content className="app-content">
        <Description>
          초기 프로필 설정을 해주세요! <br />이 과정은 한 번만 필요해요
        </Description>
        <RegisterBox
          showPrivacy={true}
          onPrivacyClick={() => setShowModal(true)}
          onValidChange={setIsValid}
        />
        <FormButton
          buttonStyle={'filled'}
          text={'가입'}
          onClick={handleSubmit}
          disabled={!isValid}
        />
      </Content>
      <div className={'bottom-gap'} />
      <CommonModal
        isOpen={showModal}
        title="개인정보 수집 · 이용 동의"
        content={
          <>
            <strong>1. 수집 항목</strong>
            <ul>
              <li>이름(닉네임), 학과, 학번, 전공 건물 정보</li>
            </ul>

            <strong>2. 수집 목적</strong>
            <ul>
              <li>서비스 회원가입 및 이용자 식별</li>
              <li>학내 전용 서비스 제공 및 후기작성 콘텐츠 제공</li>
            </ul>

            <strong>3. 보유 및 이용 기간</strong>
            <ul>
              <li>회원 탈퇴 시까지 보관 후 지체 없이 파기</li>
            </ul>

            <strong>4. 동의 거부권 안내</strong>
            <ul>
              <li>개인정보 수집에 동의하지 않을 경우, 서비스 이용이 제한될 수 있습니다.</li>
            </ul>
          </>
        }
        confirmText="확인"
        onConfirm={() => setShowModal(false)}
      />
    </RegisterWrapper>
  )
}

export default Register
