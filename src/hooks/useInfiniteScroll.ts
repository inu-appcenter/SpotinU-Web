import { useEffect, useRef } from 'react'

type Opts = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  disabled?: boolean // issue fix : 로딩 중/마지막 페이지면 관찰 잠깐 끔
}

export function useInfiniteScroll(
  onHitBottom: () => void,
  deps: unknown[] = [],
  { root = null, rootMargin = '120px 0px', threshold = 0, disabled = false }: Opts = {},
) {
  const ref = useRef<HTMLDivElement | null>(null)
  const locked = useRef(false) // issue fix : 같은 프레임 다발 호출 잠금

  useEffect(() => {
    if (disabled) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (locked.current) return
        locked.current = true
        requestAnimationFrame(() => {
          onHitBottom() // issue fix : 항상 최신 onHitBottom 사용 (deps에 포함해서)
          locked.current = false
        })
      },
      { root, rootMargin, threshold },
    )

    io.observe(el)
    return () => io.disconnect()
    // issue fix : 최신 상태 보장을 위해 onHitBottom과 deps를 모두 포함
  }, [onHitBottom, root, rootMargin, threshold, disabled, ...deps])

  return ref
}
