import { useCallback, useEffect, useRef, useState } from 'react'

export type Place = {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
}

/** 더미 fetch */
async function fetchPlaces(page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const total = 40
  const count = Math.min(pageSize, total - start)

  const items: Place[] = Array.from({ length: Math.max(0, count) }, (_, i) => {
    const n = start + i + 1
    return {
      id: `p-${page}-${i}`,
      title: `복지회관 테라스`,
      subtitle: '조용하고 힐링하기 좋은 야외 휴게 공간',
      building: `1호관 1층`,
      distanceText: `현재 위치에서 100m`,
      imageUrl: `https://picsum.photos/seed/place-${n}/800/450`,
      typeText: '자유석, 실외',
    }
  })

  await new Promise((r) => setTimeout(r, 250))
  const next = start + count < total ? page + 1 : null
  return { items, next }
}

/** 중복 호출/중복 merge를 막는 초간단 페이징 스토어 */
export function usePlaces(pageSize = 8) {
  const [list, setList] = useState<Place[]>([])
  const [next, setNext] = useState<number | null>(1)
  const [loading, setLoading] = useState(false)

  // 페이지 단위 락/기록
  const inFlight = useRef<Set<number>>(new Set())
  const loaded = useRef<Set<number>>(new Set())

  const dedupeMerge = (prev: Place[], incoming: Place[]) => {
    const seen = new Set(prev.map((p) => p.id))
    const add = incoming.filter((p) => !seen.has(p.id))
    return prev.concat(add)
  }

  const load = useCallback(
    async (page: number, reset = false) => {
      if (page == null) return

      // reset이면 모든 상태 초기화
      if (reset) {
        inFlight.current.clear()
        loaded.current.clear()
        setList([])
      }

      // 이미 로딩 중/로딩 완료된 페이지면 스킵
      if (inFlight.current.has(page) || loaded.current.has(page)) return
      if (!reset && next === null) return

      inFlight.current.add(page)
      setLoading(true)
      try {
        const { items, next: np } = await fetchPlaces(page, pageSize)
        loaded.current.add(page)
        setList((prev) => (reset ? items : dedupeMerge(prev, items))) // 중복 합치기 방지
        setNext(np)
      } finally {
        inFlight.current.delete(page)
        setLoading(false)
      }
    },
    [next, pageSize],
  )

  // 첫 로드
  useEffect(() => {
    load(1, true)
  }, [load])

  const loadMore = useCallback(() => {
    if (next != null && !inFlight.current.has(next)) {
      load(next)
    }
  }, [next, load])

  return { list, loading, hasNext: next !== null, loadMore }
}
