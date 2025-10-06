import { useEffect, useRef, useState } from 'react'

import savedIconUrl from '@/assets/savedIcon.svg'
import MapBottomSheet from '@/components/MyCampusMap/MapBottomSheet'
import { useKakaoLoader } from '@/hooks/useKakaoLoader'

/*
    인천대 좌표(기본 중심): 37.37504153409204, 126.63212161312468
*/

const DEFAULT_CENTER = { lat: 37.37504153409204, lng: 126.63212161312468 }

type FavPlace = {
  id: string
  title: string
  subtitle?: string
  building: string
  distanceText?: string
  imageUrl?: string
  lat: number
  lng: number
}

// 인천대 좌표 주변 더미 즐겨찾기 3개
const FAVORITES: FavPlace[] = [
  {
    id: 'fav-1',
    title: '캠퍼스 공간 1',
    subtitle: '햇살 좋은 창가 자리',
    building: '1호관 1층',
    distanceText: '가까움',
    imageUrl: '',
    lat: DEFAULT_CENTER.lat + 0.0007,
    lng: DEFAULT_CENTER.lng + 0.0006,
  },
  {
    id: 'fav-2',
    title: '캠퍼스 공간 2',
    subtitle: '조용한 학습 공간',
    building: '2호관 2층',
    distanceText: '보통',
    imageUrl: '',
    lat: DEFAULT_CENTER.lat - 0.0008,
    lng: DEFAULT_CENTER.lng + 0.0004,
  },
  {
    id: 'fav-3',
    title: '캠퍼스 공간 3',
    subtitle: '소규모 모임에 적합',
    building: '3호관 3층',
    distanceText: '조금 멈',
    imageUrl: '',
    lat: DEFAULT_CENTER.lat + 0.0005,
    lng: DEFAULT_CENTER.lng - 0.0007,
  },
]

const MapContainer = () => {
  const loaded = useKakaoLoader()
  const wrapRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // 지도 및 현재 위치 관련 객체 보관
  const mapObj = useRef<kakao.maps.Map | null>(null)
  const meOverlay = useRef<kakao.maps.CustomOverlay | null>(null)
  const accCircle = useRef<kakao.maps.Circle | null>(null)
  const watchId = useRef<number | null>(null)
  const lastPos = useRef<{ lat: number; lng: number } | null>(null)

  // 바텀시트 상태
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pickedId, setPickedId] = useState<string | null>(null)
  const picked = pickedId ? FAVORITES.find((p) => p.id === pickedId) : null

  useEffect(() => {
    if (!loaded || !mapRef.current) return

    const { kakao } = window

    // 지도 초기화 (기본: 인천대 좌표)
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
      level: 3,
    })
    mapObj.current = map

    // 즐겨찾기 마커 렌더링
    const favImage = new kakao.maps.MarkerImage(savedIconUrl, new kakao.maps.Size(28, 28), {
      offset: new kakao.maps.Point(14, 14),
    })
    FAVORITES.forEach((f) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(f.lat, f.lng),
        image: favImage,
        map,
        clickable: true,
      })
      kakao.maps.event.addListener(marker, 'click', () => {
        setPickedId(f.id)
        setSheetOpen(true)
      })
    })

    // 현재 위치 오버레이/정확도 원 업데이트
    const updateMe = (lat: number, lng: number, acc?: number) => {
      const pos = new kakao.maps.LatLng(lat, lng)
      if (!meOverlay.current) {
        const el = document.createElement('div')
        el.style.cssText = [
          'width:18px',
          'height:18px',
          'border-radius:50%\n',
          'background:#1a73e8',
          'box-shadow:0 0 0 4px rgba(26,115,232,.25)',
          'transform:translate(-50%,-50%)',
        ].join(';')
        meOverlay.current = new kakao.maps.CustomOverlay({
          yAnchor: 0.5,
          xAnchor: 0.5,
          map,
          position: pos,
          content: el,
        })
      } else {
        meOverlay.current.setPosition(pos)
      }

      if (typeof acc === 'number') {
        const clamped = Math.min(Math.max(acc, 10), 300) // 10~300m로 제한
        if (!accCircle.current) {
          accCircle.current = new kakao.maps.Circle({
            map,
            center: pos,
            radius: clamped,
            strokeWeight: 0,
            fillColor: '#1a73e8',
            fillOpacity: 0.12,
          })
        } else {
          accCircle.current.setPosition(pos)
          accCircle.current.setRadius(clamped)
        }
      }
      lastPos.current = { lat, lng }
    }

    // 1) 최초 한 번만 현재 위치 얻기 → 센터 이동
    const locateOnce = () => {
      if (!navigator.geolocation) return
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const { latitude, longitude, accuracy } = p.coords
          updateMe(latitude, longitude, accuracy)
          map.setCenter(new kakao.maps.LatLng(latitude, longitude))
          map.setLevel(3)
        },
        // 실패 시 기본 좌표 유지
        () => void 0,
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 },
      )
    }

    locateOnce()

    // 2) 이동 추적(선택): 위치 변동 시 오버레이만 갱신
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (p) => {
          const { latitude, longitude, accuracy } = p.coords
          updateMe(latitude, longitude, accuracy)
        },
        () => void 0,
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
      )
    }

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current)
      meOverlay.current?.setMap(null)
      accCircle.current?.setMap(null)
    }
  }, [loaded])

  const recenter = () => {
    const map = mapObj.current
    const pos = lastPos.current
    if (!map || !pos) return
    const { kakao } = window
    map.setCenter(new kakao.maps.LatLng(pos.lat, pos.lng))
    map.setLevel(3)
  }

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* 상단 즐겨찾기 버튼 제거 → 지도 마커로 대체 */}

      <button
        onClick={recenter}
        type="button"
        aria-label="현재 위치로 이동"
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          zIndex: 1,
          padding: '8px 10px',
          borderRadius: 10,
          border: '1px solid #e5e7eb',
          background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(6px)',
          fontWeight: 600,
        }}
      >
        현재 위치
      </button>

      <MapBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        place={
          picked
            ? {
                id: picked.id,
                title: picked.title,
                subtitle: picked.subtitle ?? '',
                building: picked.building,
                distanceText: picked.distanceText ?? '',
                imageUrl: picked.imageUrl ?? '',
                typeText: undefined,
              }
            : null
        }
        onClickPrimary={() => setSheetOpen(false)}
        primaryLabel="닫기"
      />
    </div>
  )
}

export default MapContainer
