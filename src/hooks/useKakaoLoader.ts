import { useEffect, useState } from 'react'

declare global {
  interface Window {
    // eslint 오류 임시 제거
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any
  }
}

export function useKakaoLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false`
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true)
      })
    }

    document.head.appendChild(script)
  }, [])

  return loaded
}
