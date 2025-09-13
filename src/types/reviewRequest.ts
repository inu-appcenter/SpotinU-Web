export type ReviewCreateRequest = {
  content: string
  rating: number
  visitAt: string
  keywords?: string[]
  isPrivate?: boolean
}
