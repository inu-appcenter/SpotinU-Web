// src/hooks/usePlaces.ts
import { useCallback, useEffect, useState } from 'react'

export type Place = {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
}

/** 데모용: 실제 API로 교체하세요 */
async function fetchPlaces(page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const total = 40
  const items: Place[] = Array.from({ length: Math.min(pageSize, total - start) }, (_, i) => {
    const n = start + i + 1
    return {
      id: `p-${n}`,
      title: `복지회관 테라스`,
      subtitle: '조용하고 힐링하기 좋은 야외 휴게 공간',
      building: `1호관 1층`,
      distanceText: `현재 위치에서 100m`,
      // 더미 단계에서는 public/ 아래 로컬 이미지 사용을 권장
      imageUrl: `https://picsum.photos/seed/place-${n}/800/450`,
      typeText: '자유석, 실외',
    }
  })
  await new Promise((r) => setTimeout(r, 250))
  const next = start + items.length < total ? page + 1 : null
  return { items, next }
}

/**
 * 아주 단순한 무한스크롤용 훅
 * - list, loading, hasNext, loadMore만 제공
 */
export function usePlaces(pageSize = 8) {
  const [list, setList] = useState<Place[]>([])
  const [next, setNext] = useState<number | null>(1)
  const [loading, setLoading] = useState(false)

  const load = useCallback(
    async (page: number, reset = false) => {
      if (loading || (next === null && !reset)) return
      setLoading(true)
      const { items, next: np } = await fetchPlaces(page, pageSize)
      setList((prev) => (reset ? items : [...prev, ...items]))
      setNext(np)
      setLoading(false)
    },
    [loading, next, pageSize],
  )

  // 첫 페이지 로드
  useEffect(() => {
    load(1, true)
  }, [load])

  const loadMore = useCallback(() => {
    if (next && !loading) load(next)
  }, [next, loading, load])

  return { list, loading, hasNext: next !== null, loadMore }
}
