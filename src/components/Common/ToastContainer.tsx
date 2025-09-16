import styled from 'styled-components'

import { useToastStore } from '@/stores/toastStore'

const Wrap = styled.div`
  position: fixed;
  left: 50%;
  top: 16px;
  transform: translateX(-50%);
  width: min(100vw, 430px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10000;
  pointer-events: none;
`

const Item = styled.div<{ type: 'success' | 'error' | 'info' }>`
  margin: 0 auto;
  max-width: calc(100% - 24px);
  padding: 10px 14px;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  background: ${({ type }) =>
    type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#374151'};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  pointer-events: auto;
`

const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts)

  if (!toasts.length) return null
  return (
    <Wrap>
      {toasts.map((t) => (
        <Item key={t.id} type={t.type} role="status">
          {t.message}
        </Item>
      ))}
    </Wrap>
  )
}

export default ToastContainer
