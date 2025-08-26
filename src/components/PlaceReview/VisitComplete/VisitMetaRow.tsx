// 날짜/요일/시각/방문차수 + 내역삭제 버튼
import styled from 'styled-components'

type Props = {
  /** 예: "7월 25일 금" */
  dateText: string
  /** 예: "오후 3시" */
  timeText: string
  /** 예: "1번째 방문" */
  countText?: string
  /** 내역삭제 버튼 클릭 시 실행 */
  onDelete?: () => void
}

export default function VisitMetaRow({ dateText, timeText, countText, onDelete }: Props) {
  return (
    <Wrap>
      <Left>
        <DateTitle>{dateText}</DateTitle>
        <Sub>
          {timeText}
          {countText ? ` · ${countText}` : ''}
        </Sub>
      </Left>
      <Right>
        <DeleteBtn type="button" onClick={onDelete}>
          🗑 내역삭제
        </DeleteBtn>
      </Right>
    </Wrap>
  )
}

/* ---------- styled ---------- */
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const DateTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
`

const Sub = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #666;
`

const Right = styled.div``

const DeleteBtn = styled.button`
  font-size: 12px;
  background: none;
  border: 0;
  color: #666;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #d33;
  }
`
