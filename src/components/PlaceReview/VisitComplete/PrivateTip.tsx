// 안녕하세요 이 페이지는 나만 볼 수 있어요
import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  defaultOpen?: boolean
}

export default function PrivateTip({ defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  if (!open) return null

  return (
    <Wrap>
      <Icon role="img" aria-label="lock">
        🔒
      </Icon>
      <Text>안심하세요! 이 페이지는 나만 볼 수 있어요.</Text>
      <CloseBtn type="button" aria-label="닫기" onClick={() => setOpen(false)}>
        ×
      </CloseBtn>
    </Wrap>
  )
}

/* ---------- styled ---------- */
const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 16px 0;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 12px;
  color: #333;
  position: relative;
`

const Icon = styled.span`
  font-size: 14px;
`

const Text = styled.span`
  flex: 1;
`

const CloseBtn = styled.button`
  background: none;
  border: 0;
  font-size: 16px;
  line-height: 1;
  color: #888;
  cursor: pointer;
`
