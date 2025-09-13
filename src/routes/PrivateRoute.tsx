import { useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

import CommonModal from '@/components/Common/CommonModal'
import { useAuthContext } from '@/hooks/useAuthContext.ts'

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [showModal, setShowModal] = useState(!isAuthenticated)

  // 로그인 안 한 경우-> 모달 띄우고 로그인 페이지로 이동
  if (!isAuthenticated && showModal) {
    return (
      <CommonModal
        isOpen={showModal}
        title={'로그인이 필요한 서비스입니다.'}
        content={'로그인 페이지로 이동하시겠어요?'}
        confirmText={'네'}
        cancelText={'아니요'}
        onConfirm={() => {
          setShowModal(false)
          navigate('/login', { state: { from: location } })
        }}
        onCancel={() => {
          setShowModal(false)
          navigate(-1)
        }}
      />
    )
  }

  return <Outlet />
}
