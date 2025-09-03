import { useEffect, useRef } from 'react'

import { useKakaoLoader } from '@/hooks/useKakaoLoader'

/*
    인천대 좌표: 37.37504153409204, 126.63212161312468
*/

const MapContainer = () => {
  const loaded = useKakaoLoader()
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaded || !mapRef.current) return

    const { kakao } = window
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.37504153409204, 126.63212161312468), // 인천대 좌표
      level: 3, // 확대 레벨 (낮을수록 확대)
    })

    // 마커 예시
    new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.37504153409204, 126.63212161312468),
      map,
    })
  }, [loaded])
  {
    /* 임시 */
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
}

export default MapContainer
