// 날짜/요일/시각/방문차수 + 내역삭제 버튼
import { Trash2 } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  dateText: string
  timeText: string
  countText?: string

  onDelete?: () => void
}

export default function VisitMetaRow({ dateText, timeText, countText, onDelete }: Props) {
  return (
    <Wrap>
      <Left>
        <DateTitle>{dateText}</DateTitle>
        <Sub>
          {timeText}
          {countText ? `  ${countText}` : ''}
        </Sub>
      </Left>
      <Right>
        <DeleteBtn type="button" onClick={onDelete}>
          <Trash2 size={15} strokeWidth={2} />
          <span>내역삭제</span>
        </DeleteBtn>
      </Right>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const DateTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
`

const Sub = styled.div`
  margin-top: 6px;
  font-size: 15px;
  color: #000000ff;
`

const Right = styled.div``

const DeleteBtn = styled.button`
  margin-top: 10px;
  font-size: 13px;
  background: none;
  border: 0;
  color: #073b7b;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  span {
    text-decoration: underline;
    text-underline-offset: 2.5px;
  }
`
