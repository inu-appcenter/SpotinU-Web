import { useEffect, useRef, useState } from 'react'

import MapBottomSheet from '@/components/MyCampusMap/MapBottomSheet'
import { PLACES } from '@/dummy/PlacesDummy'
import { useKakaoLoader } from '@/hooks/useKakaoLoader'

/*
    인천대 좌표(기본 중심): 37.37504153409204, 126.63212161312468
*/

const DEFAULT_CENTER = { lat: 37.37504153409204, lng: 126.63212161312468 }

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
  const picked = pickedId ? PLACES.find((p) => p.id === pickedId) : null

  useEffect(() => {
    if (!loaded || !mapRef.current) return

    const { kakao } = window

    // 지도 초기화 (기본: 인천대 좌표)
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
      level: 3,
    })
    mapObj.current = map

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

      {/* 즐겨찾기 Picker (예시: 상단 중앙) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 60,
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          gap: 8,
          padding: '6px 8px',
          borderRadius: 12,
          background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #e5e7eb',
          maxWidth: 'calc(100% - 24px)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
        aria-label="즐겨찾기 선택"
      >
        {PLACES.slice(0, 8).map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPickedId(p.id)
              setSheetOpen(true)
            }}
            type="button"
            style={{
              padding: '6px 10px',
              borderRadius: 999,
              border: '1px solid #d1d5db',
              background: pickedId === p.id ? '#073b7b' : '#fff',
              color: pickedId === p.id ? '#fff' : '#111827',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

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
                subtitle: picked.subtitle,
                building: picked.building,
                distanceText: picked.distanceText,
                imageUrl: picked.imageUrl,
                typeText: picked.typeText,
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
