import { useCallback, useEffect, useRef, useState } from 'react'
import { PLACES } from '@/dummy/PlacesDummy'

export type Place = {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
  tags?: string[]
}

/** 더미 fetch: 더미 데이터(PLACES)에서 필터+페이지네이션 적용 */
async function fetchPlaces(page: number, pageSize: number, filter: string | '' = '') {
  const start = (page - 1) * pageSize
  const pool = filter ? PLACES.filter((p) => p.tags.includes(filter)) : PLACES
  const total = pool.length
  const slice = pool.slice(start, start + pageSize)
  const items: Place[] = slice.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    building: p.building,
    distanceText: p.distanceText,
    imageUrl: p.imageUrl,
    typeText: p.typeText,
    tags: p.tags,
  }))

  await new Promise((r) => setTimeout(r, 200))
  const next = start + items.length < total ? page + 1 : null
  return { items, next }
}

/** 중복 호출/중복 merge를 막는 초간단 페이징 스토어 */
export function usePlaces(pageSize = 8, filter: string | '' = '') {
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

      inFlight.current.add(page)
      setLoading(true)
      try {
        const { items, next: np } = await fetchPlaces(page, pageSize, filter)
        loaded.current.add(page)
        setList((prev) => (reset ? items : dedupeMerge(prev, items))) // 중복 합치기 방지
        setNext(np)
      } finally {
        inFlight.current.delete(page)
        setLoading(false)
      }
    },
    [pageSize, filter],
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
