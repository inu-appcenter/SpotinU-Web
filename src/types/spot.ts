export type PlaceType = 'INDOOR' | 'OUTDOOR' | 'ETC'

export type SpotPhoto = {
  id: number
  url: string
  thumbnail: boolean
  orderIndex: number
}

export type SpotReview = {
  id: number
  memberName: string
  photos: SpotPhoto[]
  content: string
  visitDate: string
  visitTime: string
  keywords: string[]
}

export type SpotDetail = {
  id: number
  latitude: string
  longitude: string
  name: string
  locationDetail: string
  description: string
  businessHours: string
  sleepingAllowed: boolean
  eatingAllowed: boolean
  hasPowerOutlet: boolean
  studyAllowed: boolean
  entertainment: boolean
  reservationRequired: boolean
  placeType: PlaceType
  photos: SpotPhoto[]
  businessHoursDetail: string
  descriptionDetail: string
  reviews: SpotReview[]
}

export type PageResult<T> = {
  totalPages: number
  totalElements: number
  pageable: unknown
  first: boolean
  last: boolean
  sort: unknown
  size: number
  content: T[]
  number: number
  numberOfElements: number
  empty: boolean
}

export type SpotListItem = {
  id: number
  latitude: string
  longitude: string
  name: string
  locationDetail: string
  description: string
  photo: string | null
  sleepingAllowed: boolean
  eatingAllowed: boolean
  hasPowerOutlet: boolean
  studyAllowed: boolean
  entertainment: boolean
  reservationRequired: boolean
  placeType: PlaceType
}
