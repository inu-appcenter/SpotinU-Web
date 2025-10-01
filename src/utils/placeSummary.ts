export type PlaceFeatureFlags = {
  sleepingAllowed: boolean
  eatingAllowed: boolean
  hasPowerOutlet: boolean
  studyAllowed: boolean
  entertainment: boolean
  reservationRequired: boolean
  placeType: string
}

type FeatureKey = keyof Omit<PlaceFeatureFlags, 'placeType'>

const FEATURE_LABELS: Record<FeatureKey, string> = {
  sleepingAllowed: '취침',
  eatingAllowed: '취식',
  hasPowerOutlet: '콘센트',
  studyAllowed: '개인공부',
  entertainment: '오락시설',
  reservationRequired: '예약제',
}

export const derivePlaceTags = (flags: PlaceFeatureFlags): string[] => {
  const tags: string[] = []

  const entries = Object.entries(FEATURE_LABELS) as [FeatureKey, string][]
  entries.forEach(([key, label]) => {
    if (flags[key]) tags.push(label)
  })

  const type = flags.placeType?.toUpperCase()
  if (type === 'OUTDOOR') tags.push('야외')

  return tags
}

export const calculateDistanceInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 6371e3 // 지구 반경 (m)

  const phi1 = toRad(lat1)
  const phi2 = toRad(lat2)
  const deltaPhi = toRad(lat2 - lat1)
  const deltaLambda = toRad(lon2 - lon1)

  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export const formatDistanceText = (distanceInMeters: number | null | undefined): string => {
  if (distanceInMeters == null || !Number.isFinite(distanceInMeters)) return '거리 정보 없음'

  if (distanceInMeters < 1000) return `약 ${Math.round(distanceInMeters)}m`

  const km = distanceInMeters / 1000
  const display = km < 10 ? km.toFixed(1) : Math.round(km).toString()
  return `약 ${display}km`
}
