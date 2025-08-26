// 상단
import styled from 'styled-components'

type Props = {
  placeName: string
  /** ISO 문자열 또는 Date 객체 */
  visitAt?: string | Date
  /** N번째 방문 */
  visitCount: number
  /** 선택된 키워드(없으면 빈 배열) */
  keywords: string[]
  /** '선택할 키워드가 없어요' 표시 여부 */
  noKeyword: boolean
}

const Wrap = styled.section`
  display: grid;
  gap: 8px;
`

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const Title = styled.div`
  display: grid;
  gap: 4px;
  strong {
    font-size: 16px;
  }
  .meta {
    font-size: 12px;
    color: #666;
  }
`

const PillBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  background: #f2f4f8;
  color: #333;
  border: 1px solid #e3e8ef;
`

const PillOutlinePrimary = styled(Pill)`
  background: #eaf1ff;
  color: #2e5aff;
  border-color: #bbd3ff;
`

function formatDate(isoOrDate?: string | Date) {
  if (!isoOrDate) return ''
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const week = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
  return `${y}.${m}.${day}.(${week})`
}

export default function VisitHistory({
  placeName,
  visitAt,
  visitCount,
  keywords,
  noKeyword,
}: Props) {
  const dateText = formatDate(visitAt)

  return (
    <Wrap>
      <Head>
        <Title>
          <strong>[{placeName}]</strong>
          <div className="meta">
            {dateText || '방문 일시 미선택'} · {visitCount}번째 방문
          </div>
        </Title>
        {/* 우측 X 버튼 등 액션이 필요하면 여기 추가 */}
      </Head>

      <PillBar>
        {noKeyword ? (
          <PillOutlinePrimary>선택할 키워드가 없어요</PillOutlinePrimary>
        ) : keywords.length > 0 ? (
          keywords.map((k) => <Pill key={k}>{k}</Pill>)
        ) : (
          <Pill>키워드 미선택</Pill>
        )}
      </PillBar>
    </Wrap>
  )
}
