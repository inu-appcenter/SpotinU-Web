import type { ReactNode } from 'react'
import styled from 'styled-components'

export type Keyword = { id: string; label: string; icon?: ReactNode }
export type Group = { title: string; items: Keyword[] }

type Props = {
  selected: Set<string>
  onChange: (next: Set<string>) => void
  noKeyword: boolean
  onNoKeywordChange: (value: boolean) => void
  minPick?: number
  maxPick?: number
  groups?: Group[]
  valueKey?: 'id' | 'label' // ← 라벨 저장할 때 'label'
}

const DEFAULT_GROUPS: Group[] = [
  {
    title: '분위기',
    items: [
      { id: 'cozy', label: '아늑해요' },
      { id: 'view', label: '뷰가 좋아요' },
      { id: 'interior', label: '인테리어가 멋져요' },
      { id: 'alone', label: '혼밥하기 좋아요' },
    ],
  },
  {
    title: '기타',
    items: [
      { id: 'seat', label: '좌석이 편해요' },
      { id: 'clean', label: '공간이 청결해요' },
      { id: 'group', label: '단체모임하기 좋아요' },
      { id: 'nokey', label: '선택할 키워드가 없어요' }, // 전용 버튼으로 처리
    ],
  },
]

export default function ReviewKeywordSelector({
  selected,
  onChange,
  noKeyword,
  onNoKeywordChange,
  minPick = 1,
  maxPick = 3,
  groups = DEFAULT_GROUPS,
  valueKey = 'id',
}: Props) {
  const toggleByValue = (val: string) => {
    if (noKeyword) return
    const next = new Set(selected)
    if (next.has(val)) next.delete(val)
    else {
      if (next.size >= maxPick) return
      next.add(val)
    }
    onChange(next)
  }

  const handleNoKeyword = () => {
    onNoKeywordChange(!noKeyword)
    onChange(new Set()) // 초기화
  }

  return (
    <Wrap>
      <Head>
        <Title>
          어떤 점이 좋았나요? <Required>(필수)</Required>
        </Title>
        <Desc>
          이 곳에 어울리는 키워드를 골라주세요. ({minPick}개~{maxPick}개)
        </Desc>
      </Head>

      <Grid>
        {groups.map((g) => (
          <Col key={g.title}>
            <ColTitle>{g.title}</ColTitle>
            <Chips>
              {g.items.map((it) => {
                // 선택할 키워드가 없어요
                if (it.id === 'nokey') {
                  return (
                    <Chip
                      key={it.id}
                      as="button"
                      $active={noKeyword} // 파란색 토글 표시
                      onClick={handleNoKeyword} //  다시 누르면 해제
                    >
                      {it.label}
                    </Chip>
                  )
                }
                const val = valueKey === 'id' ? it.id : it.label
                const isActive = selected.has(val)

                return (
                  <Chip
                    key={it.id}
                    as="button"
                    $active={isActive}
                    $disabled={noKeyword}
                    onClick={() => toggleByValue(val)}
                  >
                    {it.label}
                  </Chip>
                )
              })}
            </Chips>
          </Col>
        ))}
      </Grid>
    </Wrap>
  )
}

const Wrap = styled.section`
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`

const Head = styled.div``

const Title = styled.div`
  font-weight: 800;
  margin-bottom: 6px;
`
const Required = styled.span`
  color: #0d3b66;
  margin-left: 6px;
`
const Desc = styled.div`
  color: #8b93a1;
  font-weight: 600;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  margin-top: 12px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr; /* 모바일 좁을 때 한 컬럼 */
  }
`

const Col = styled.div``
const ColTitle = styled.div`
  font-weight: 800;
  margin-bottom: 8px;
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Chip = styled.div<{ $active?: boolean; $disabled?: boolean }>`
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? '#2053ff' : '#d7dbe2')};
  background: ${({ $active }) => ($active ? '#e9f0ff' : '#efefef')};
  color: ${({ $active }) => ($active ? '#2053ff' : '#333')};
  font-weight: 700;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`
