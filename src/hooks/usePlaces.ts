import { useCallback, useEffect, useRef, useState } from 'react'

import { api } from '@/apis/api'
import type { PlaceSummary } from '@/types/PlaceSummaryType'
import {
  calculateDistanceInMeters,
  derivePlaceTags,
  formatDistanceText,
} from '@/utils/placeSummary'

export type Place = PlaceSummary

type Coordinates = { lat: number; lng: number }

type SpotApiItem = {
  id: number
  latitude: string
  longitude: string
  name: string
  locationDetail: string
  description: string
  photo: string
  sleepingAllowed: boolean
  eatingAllowed: boolean
  hasPowerOutlet: boolean
  studyAllowed: boolean
  entertainment: boolean
  reservationRequired: boolean
  placeType: string
}

type SpotListPayload = {
  content: SpotApiItem[]
  page: number
  size: number
  totalElements: number
}

type FetchResult = {
  spots: SpotApiItem[]
  page: number
  size: number
  total: number
}

const DEFAULT_DISTANCE_TEXT = '거리 정보 없음'

const ensureNumber = (value: string | number | null | undefined): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const requestSpots = async (page: number, pageSize: number): Promise<FetchResult> => {
  const response = await api.get('/spots', {
    params: { page: page - 1, size: pageSize },
  })

  const data: SpotListPayload | undefined = response.data?.data
  if (!data) return { spots: [], page: page - 1, size: pageSize, total: 0 }

  return {
    spots: Array.isArray(data.content) ? data.content : [],
    page: typeof data.page === 'number' ? data.page : page - 1,
    size: typeof data.size === 'number' ? data.size : pageSize,
    total: typeof data.totalElements === 'number' ? data.totalElements : 0,
  }
}

const buildTypeText = (tags: string[], placeType: string): string | undefined => {
  const normalized = placeType?.toUpperCase()
  const typeLabel = normalized === 'OUTDOOR' ? '야외' : normalized === 'INDOOR' ? '실내' : undefined
  const attributes = tags.filter((tag) => tag !== '야외' && tag !== '실내')

  const display = [typeLabel, ...attributes].filter(Boolean).slice(0, 2) as string[]
  return display.length > 0 ? display.join(' · ') : undefined
}

const mapSpotToPlace = (spot: SpotApiItem): PlaceSummary => {
  const latitude = ensureNumber(spot.latitude)
  const longitude = ensureNumber(spot.longitude)

  const tags = derivePlaceTags({
    sleepingAllowed: Boolean(spot.sleepingAllowed),
    eatingAllowed: Boolean(spot.eatingAllowed),
    hasPowerOutlet: Boolean(spot.hasPowerOutlet),
    studyAllowed: Boolean(spot.studyAllowed),
    entertainment: Boolean(spot.entertainment),
    reservationRequired: Boolean(spot.reservationRequired),
    placeType: spot.placeType,
  })

  const uniqueTags = Array.from(new Set(tags))

  return {
    id: String(spot.id),
    title: spot.name ?? '',
    subtitle: spot.description ?? '',
    building: spot.locationDetail ?? '',
    distanceText: DEFAULT_DISTANCE_TEXT,
    imageUrl: spot.photo || '',
    typeText: buildTypeText(uniqueTags, spot.placeType),
    tags: uniqueTags,
    latitude,
    longitude,
  }
}

const withUpdatedDistance = (
  place: PlaceSummary,
  coords: Coordinates | null,
): { place: PlaceSummary; distance: number | null } => {
  if (!coords || place.latitude == null || place.longitude == null) {
    return { place, distance: null }
  }

  const meters = calculateDistanceInMeters(coords.lat, coords.lng, place.latitude, place.longitude)
  return {
    place: {
      ...place,
      distanceText: formatDistanceText(meters),
    },
    distance: meters,
  }
}

const mergeAndSortByDistance = (
  prev: PlaceSummary[],
  incoming: PlaceSummary[],
  coords: Coordinates | null,
) => {
  const registry = new Map<string, PlaceSummary>()
  prev.forEach((p) => registry.set(p.id, p))
  incoming.forEach((p) => registry.set(p.id, p))

  const enriched = Array.from(registry.values()).map((place) => withUpdatedDistance(place, coords))

  enriched.sort((a, b) => {
    const ad = a.distance
    const bd = b.distance
    if (ad == null && bd == null) return 0
    if (ad == null) return 1
    if (bd == null) return -1
    return ad - bd
  })

  return enriched.map(({ place }) => place)
}

const applyFilter = (places: PlaceSummary[], filter: string | '') =>
  filter ? places.filter((item) => item.tags.includes(filter)) : places

export function usePlaces(pageSize = 8, filter: string | '' = '') {
  const [allPlaces, setAllPlaces] = useState<PlaceSummary[]>([])
  const [list, setList] = useState<PlaceSummary[]>([])
  const [loading, setLoading] = useState(false)
  const coordsRef = useRef<Coordinates | null>(null)

  const fetchAllPages = useCallback(async () => {
    setLoading(true)
    try {
      const collected: PlaceSummary[] = []
      let page = 1

      while (true) {
        const { spots, size, total } = await requestSpots(page, pageSize)
        if (spots.length === 0) break

        const mapped = spots.map(mapSpotToPlace)
        collected.push(...mapped)

        const pageSizeUsed = size || pageSize
        const totalLoaded = page * pageSizeUsed
        const moreByTotal = total > totalLoaded
        const moreByContent = spots.length === pageSizeUsed && spots.length > 0

        if (!(moreByTotal || moreByContent)) break
        page += 1
      }

      const sorted = mergeAndSortByDistance([], collected, coordsRef.current ?? null)
      setAllPlaces(sorted)
    } catch (error) {
      console.error('장소 목록을 불러오지 못했습니다:', error)
      setAllPlaces([])
    } finally {
      setLoading(false)
    }
  }, [pageSize])

  useEffect(() => {
    fetchAllPages().catch(console.error)
  }, [fetchAllPages])

  useEffect(() => {
    setList(applyFilter(allPlaces, filter))
  }, [allPlaces, filter])

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        coordsRef.current = nextCoords
        setAllPlaces((prev) => mergeAndSortByDistance([], prev, nextCoords))
      },
      (error) => {
        console.warn('위치 정보를 가져오지 못했습니다:', error)
      },
      { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5, timeout: 10000 },
    )
  }, [])

  return { list, loading }
}
