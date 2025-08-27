import type { LucideIcon } from 'lucide-react'
import { Armchair, Smile } from 'lucide-react'
import styled from 'styled-components'

export type Keyword = { id: string; label: string; Icon?: LucideIcon }
export type Group = { title: string; items: Keyword[] }

type Props = {
  selected: Set<string>
  onChange: (next: Set<string>) => void
  noKeyword: boolean
  onNoKeywordChange: (value: boolean) => void
  minPick?: number
  maxPick?: number
  groups?: Group[]
  valueKey?: 'id' | 'label'
}

const DEFAULT_GROUPS: Group[] = [
  {
    title: '분위기',
    items: [
      { id: 'cozy', label: '아늑해요', Icon: Smile },
      { id: 'view', label: '뷰가 좋아요' },
      { id: 'interior', label: '인테리어가 멋져요' },
      { id: 'alone', label: '혼밥하기 좋아요' },
    ],
  },
  {
    title: '기타',
    items: [
      { id: 'seat', label: '좌석이 편해요', Icon: Armchair },
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
                const isNoKey = it.id === 'nokey'
                const val = valueKey === 'id' ? it.id : it.label
                const isActive = selected.has(val)
                const dimmed = !isNoKey && noKeyword

                const Icon = it.Icon

                const content = (
                  <ChipInner>
                    {Icon && (
                      <IconWrap $active={isActive} $dimmed={dimmed}>
                        <Icon size={16} strokeWidth={1.7} />
                      </IconWrap>
                    )}
                    <Label>{it.label}</Label>
                  </ChipInner>
                )

                if (isNoKey) {
                  return (
                    <Chip
                      key={it.id}
                      type="button"
                      $variant="nokey"
                      $active={noKeyword}
                      onClick={handleNoKeyword}
                    >
                      {content}
                    </Chip>
                  )
                }

                return (
                  <Chip
                    key={it.id}
                    type="button"
                    $variant="normal"
                    $active={isActive}
                    $dimmed={dimmed}
                    disabled={noKeyword}
                    onClick={() => toggleByValue(val)}
                  >
                    {content}
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
  border-radius: 12px;
`

const Head = styled.div``

const Title = styled.div`
  font-weight: 800;
  margin-bottom: 6px;
  font-size: 15px;
`
const Required = styled.span`
  color: #000000ff;
  margin-left: 6px;
  font-size: 13px;
`
const Desc = styled.div`
  color: #000000ff;
  font-weight: 400;
  font-size: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin-top: 12px;
  margin-left: 8px;
  gap: 50px; // -----------수정-------------------------

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    column-gap: 0;
  }
`

const Col = styled.div``
const ColTitle = styled.div`
  font-weight: 600;
  margin-bottom: 13px;
  margin-top: 13px;
  font-size: 12px;
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`

const Chip = styled.button<{
  $active?: boolean
  $dimmed?: boolean
  $variant?: 'normal' | 'nokey'
}>`
  width: 160px;
  height: 24px;

  display: flex;

  padding: 0px 12px;
  border-radius: 6px;
  font-size: 30px;
  font-weight: 500;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
  cursor: pointer;

  border: 1.7px solid #d9d9d9;
  background: #eeeeee;
  color: #000000ff;

  ${({ $active }) =>
    $active &&
    `
      border: 2px solid #073B7B;
      background: #eeeeee;
      color: #073B7B;
    `}

  ${({ $dimmed }) =>
    $dimmed &&
    `
      border-color: #D9D9D9;
      background: #5D5858;
      color: #000000ff;
      cursor: default;
    `}

  ${({ $variant, $active }) =>
    $variant === 'nokey' &&
    !$active &&
    `
      border-color: #D9D9D9;
      background: #EEEEEE;
      color: #000000ff;
    `}

  &:disabled {
    pointer-events: none;
  }
`

const ChipInner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
`

const IconWrap = styled.span<{ $active?: boolean; $dimmed?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;

  color: inherit;

  ${({ $dimmed }) =>
    $dimmed &&
    `
    border-color: #a9a9a9;
    background: #5D5858;
  `}
`

const Label = styled.span`
  font-size: 11px;
`
