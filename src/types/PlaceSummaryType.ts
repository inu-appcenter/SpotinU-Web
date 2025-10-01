export interface PlaceSummary {
  id: string
  title: string
  subtitle: string
  building: string
  distanceText: string
  imageUrl: string
  typeText?: string
  tags: string[]
  latitude: number | null
  longitude: number | null
}
