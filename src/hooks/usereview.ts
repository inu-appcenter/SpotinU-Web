// src/hooks/useReview.ts
import type { AxiosError } from 'axios'
import { useCallback, useMemo, useState } from 'react'

import { deleteReview, getSpotReviews, postSpotReview } from '@/apis/reviews'
import type { ReviewCreateRequest } from '@/types/reviewRequest'
import type { Review } from '@/types/reviewType'

type PageResult<T> = {
  list: T[]
  page: number
  size: number
  totalPages: number
  totalElements: number
  hasNext: boolean
}

// 공통 에러 메시지
function getErrMsg(e: unknown, fallback: string) {
  const err = e as AxiosError<{ message?: string }>
  return err.response?.data?.message ?? fallback
}

export function useReview() {
  // 등록 상태
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // 조회 상태
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // 삭제 상태
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // 리뷰 등록
  const createReview = useCallback(
    async (spotId: number, json: ReviewCreateRequest, photos?: File[] | null) => {
      try {
        setCreating(true)
        setCreateError(null)
        return await postSpotReview(spotId, json, photos)
      } catch (e) {
        setCreateError(getErrMsg(e, '리뷰 등록 실패'))
        throw e
      } finally {
        setCreating(false)
      }
    },
    [],
  )

  // 리뷰 목록 조회 (페이지네이션)
  const fetchReviews = useCallback(
    async (spotId: number, page = 0, size = 10): Promise<PageResult<Review>> => {
      setLoading(true)
      setFetchError(null)
      try {
        const { list, totalPages, totalElements } = await getSpotReviews(spotId, page, size)
        return {
          list: list as Review[],
          page,
          size,
          totalPages,
          totalElements,
          hasNext: page + 1 < totalPages,
        }
      } catch (e) {
        setFetchError(getErrMsg(e, '리뷰 목록 조회 실패'))
        throw e
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // 리뷰 삭제
  const removeReview = useCallback(async (spotId: number, reviewId: number) => {
    setDeletingId(reviewId)
    setDeleteError(null)
    try {
      // DELETE /api/v1/reviews/{reviewId}?spotId=...
      return await deleteReview(reviewId, spotId)
    } catch (e) {
      setDeleteError(getErrMsg(e, '리뷰 삭제 실패'))
      throw e
    } finally {
      setDeletingId(null)
    }
  }, [])

  return useMemo(
    () => ({
      // 등록
      creating,
      createError,
      createReview,
      // 조회
      loading,
      fetchError,
      fetchReviews,
      // 삭제
      deletingId,
      deleteError,
      removeReview,
    }),
    [
      creating,
      createError,
      createReview,
      loading,
      fetchError,
      fetchReviews,
      deletingId,
      deleteError,
      removeReview,
    ],
  )
}
