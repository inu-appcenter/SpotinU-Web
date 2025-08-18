import { useEffect, useRef } from 'react'

/*
    == issue ==
    크로스 오리진 read blocking 이슈 있음 -> 추후 fix 예정
*/

export function useInfiniteScroll(onHitBottom: () => void, deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => entries[0]?.isIntersecting && onHitBottom(), {
      rootMargin: '120px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}
