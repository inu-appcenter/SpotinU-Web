// 더미 장소 데이터 (메인 페이지 리스트용)
export type PlaceItem = {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
  tags: string[] // 필터 키워드: '취침' | '취식' | '콘센트' | '개인공부' | '야외' | '오락시설' | '예약제'
}

const CORE_TAGS = ['취침', '취식', '콘센트', '개인공부', '야외', '오락시설'] as const

// 40개 더미 생성 (기존 페이징 total=40과 동일)
export const PLACES: PlaceItem[] = Array.from({ length: 40 }, (_, idx) => {
  const n = idx + 1
  const baseTag = CORE_TAGS[idx % CORE_TAGS.length]
  const extraTag = CORE_TAGS[(idx + 3) % CORE_TAGS.length]
  const isReserved = idx % 2 === 1
  return {
    id: `pl-${n}`,
    title: `캠퍼스 공간 ${n}`,
    subtitle: '조용하고 힐링하기 좋은 휴게 공간',
    building: `${(idx % 5) + 1}호관 ${(idx % 3) + 1}층`,
    distanceText: `현재 위치에서 ${50 + (idx % 10) * 25}m`,
    imageUrl: `https://picsum.photos/seed/spotinu-${n}/800/450`,
    typeText: isReserved ? '예약제' : '자유석',
    tags: isReserved
      ? [baseTag as string, extraTag as string, '예약제']
      : [baseTag as string, extraTag as string],
  }
})
