import type { Review } from '@/types/reviewType'

export interface Photo {
  id: number
  url: string
  thumbnail: boolean
  orderIndex: number
}

export interface PlaceDetails {
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
  placeType: string
  photos: Photo[]
  businessHoursDetail: string
  descriptionDetail: string
  reviews: Review[]
}
