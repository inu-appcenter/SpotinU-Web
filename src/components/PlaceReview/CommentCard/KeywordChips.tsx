// VisitCompletePage의 선택한 키워드
import styled from 'styled-components'

type KeywordChipsProps = {
  keywords: string[]
}

const KeywordChips: React.FC<KeywordChipsProps> = ({ keywords }) => {
  if (!keywords?.length) return null
  return (
    <Wrap>
      {keywords.map((k) => (
        <Chip key={k}>{k}</Chip>
      ))}
    </Wrap>
  )
}

export default KeywordChips

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px 14px 0;
  margin-bottom: 8px;
`

const Chip = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 8px;
  height: 10%;

  border: 1.45px solid #073b7b;
  background: #eeeeee;
  color: #073b7b;
  font-weight: 500;
`
