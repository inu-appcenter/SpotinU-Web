// 안녕하세요 이 페이지는 나만 볼 수 있어요
import { MessageCircleWarning } from 'lucide-react'
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
      <Icon aria-label="알림">
        <MessageCircleWarning size={16} />
      </Icon>
      <Text> 안심하세요! 이 페이지는 나만 볼 수 있어요.</Text>
      <CloseBtn type="button" aria-label="닫기" onClick={() => setOpen(false)}>
        ×
      </CloseBtn>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 22px 16px 0;
  background: #fff;
  border: 1.5px solid #073b7b;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 12px;
  color: #073b7b;
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
