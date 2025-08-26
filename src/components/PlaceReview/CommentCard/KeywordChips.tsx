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
  gap: 8px;
  padding: 8px 16px 0;
`

const Chip = styled.span`
  display: inline-block;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #2e5aac;
  background: #fff;
  color: #2e5aac;
  font-weight: 600;
`
