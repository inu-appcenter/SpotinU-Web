import styled from 'styled-components'

import type { CommonModalProps } from '../../types/commonModalType.ts'

const Dimmed = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: calc(100vw - 32px);
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  background: #eeeeee;
  border-radius: 20px;
  padding: 24px 20px;
  box-sizing: border-box;
`

const Content = styled.div`
  line-height: 1.5;
  color: black;
  margin-bottom: 20px;

  ul {
    font-size: 13px;
    padding-left: 16px;
    list-style-type: disc;
  }

  strong {
    font-size: 15px;
  }
`

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 0;
  text-align: center;
  white-space: nowrap;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;
`

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  border-radius: 20px;
  font-size: 14px;
  height: 30px;
  font-weight: 600;
  background-color: ${({ primary }) => (primary ? '#073B7B' : '#F3F3F3')};
  color: ${({ primary }) => (primary ? 'white' : '#073B7B')};
  border: ${({ primary }) => (primary ? 'none' : '1px solid #073B7B')};
`

const CommonModal = ({
  isOpen,
  title,
  content,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}: CommonModalProps) => {
  if (!isOpen) return null

  return (
    <Dimmed>
      <ModalWrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ButtonGroup>
          {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
          <Button primary onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonGroup>
      </ModalWrapper>
    </Dimmed>
  )
}

export default CommonModal
