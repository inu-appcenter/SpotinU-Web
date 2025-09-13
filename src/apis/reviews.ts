import { api } from '@/apis/api'
import type { ReviewCreateRequest } from '@/types/reviewRequest'

export async function postSpotReview(
  spotId: number,
  jsonBody: ReviewCreateRequest,
  photos?: File[] | null, // 사진 없으면빈배열
) {
  const fd = new FormData()
  fd.append(
    'reviewCreateRequest',
    new Blob([JSON.stringify(jsonBody)], { type: 'application/json' }),
  )
  photos?.forEach((f) => fd.append('photos', f))

  const { data } = await api.post(`/spots/${spotId}/reviews`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

// 리뷰 조회
export async function getSpotReviews(spotId: number, page = 0, size = 10) {
  const { data } = await api.get(`/spots/${spotId}/reviews`, {
    params: { page, size },
    headers: { Accept: '*/*' },
  })

  const content = data?.data?.content ?? []
  const totalPages = data?.data?.totalPages ?? 1
  const totalElements = data?.data?.totalElements ?? content.length

  return {
    raw: data,
    list: content, // Review[]로 쓰려면 캐스팅/매퍼 적용
    totalPages,
    totalElements,
  }
}

// 리뷰 삭제
export async function deleteReview(reviewId: number, spotId?: number) {
  const { data } = await api.delete(`/reviews/${reviewId}`, {
    params: spotId ? { spotId } : undefined,
    headers: { Accept: '*/*' }, // 없어도 보통 동작하지만 명시해도 OK
  })
  return data
}
