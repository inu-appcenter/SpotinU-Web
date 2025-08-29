import { useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/Common/BackHeader.tsx'
import CommonModal from '../components/Common/CommonModal.tsx'
import FormButton from '../components/Common/FormButton.tsx'
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
`

const ProfileEdit = () => {
  useViewportVH()
  const [editModalOpen, setEditModalOpen] = useState(false) //수정 완료 모달
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false) // 탈퇴 모달
  const [withdrawCompleteModalOpen, setWithdrawCompleteModalOpen] = useState(false) // 탈퇴완료 모달

  const [isValid, setIsValid] = useState(false) //아이디, 학번 유효성 검사

  const handleEdit = () => {
    console.log(' 수정 버튼 ')
    setEditModalOpen(true)
  }

  const handleWithdraw = () => {
    setWithdrawModalOpen(true)
    console.log('탈퇴버튼')
  }

  const handleWithdrawComplete = () => {
    console.log('회원 탈퇴 완료')
    setWithdrawModalOpen(false)
    setWithdrawCompleteModalOpen(true)
  }

  return (
    <RegisterWrapper className="app">
      <HeaderWrapper className={'sticky-top'}>
        <BackHeader title={'프로필 수정'} />
      </HeaderWrapper>
      <Content className="app-content">
        <RegisterBox showPrivacy={false} onValidChange={setIsValid} />
        <ButtonGroup>
          <FormButton
            buttonStyle={'filled'}
            text={'수정'}
            onClick={handleEdit}
            disabled={!isValid}
          />
          <FormButton buttonStyle={'outline'} text={'탈퇴'} onClick={handleWithdraw} />
        </ButtonGroup>
      </Content>
      <div className={'bottom-gap'} />

      <CommonModal
        isOpen={editModalOpen}
        title={'프로필 수정이 완료되었습니다'}
        confirmText={'확인'}
        onConfirm={() => setEditModalOpen(false)}
      />

      <CommonModal
        isOpen={withdrawModalOpen}
        title={'정말로 회원 탈퇴하시겠어요?'}
        content={'탈퇴 시 계정 정보 및 즐겨찾기 정보가 모두 삭제되며 복구할 수 없습니다.'}
        confirmText={'회원탈퇴'}
        cancelText={'취소'}
        onConfirm={handleWithdrawComplete}
        onCancel={() => setWithdrawModalOpen(false)}
      />

      <CommonModal
        isOpen={withdrawCompleteModalOpen}
        title="SpotinU에서 탈퇴되었습니다"
        content="그동안 이용해주셔서 감사합니다."
        confirmText="확인"
        onConfirm={() => setWithdrawCompleteModalOpen(false)}
      />
    </RegisterWrapper>
  )
}

export default ProfileEdit
