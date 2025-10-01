import { AxiosError } from 'axios'

import { api } from '@/apis/api'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { toast } from '@/stores/toastStore'

type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export const useFavorite = () => {
  const { addFavorite, removeFavorite, hasFavorite } = useFavoriteStore.getState()

  // 즐겨찾기 토글
  const toggleFavorite = async (spotId: number) => {
    try {
      const { data } = await api.post<ApiResponse<string>>(
        `/favorites/${spotId}/toggle`,
        { memo: '메모' }, // 서버 수정 전까지 일단 디폴트값으로
      )
      console.log('api응답;', data)

      if (hasFavorite(spotId)) {
        removeFavorite(spotId)
        toast.info('저장이 취소되었습니다.')
      } else {
        addFavorite(spotId)
        toast.success('장소가 저장되었습니다!')
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ status: number; message: string }>
      const res = error.response
      toast.error(res?.data?.message ?? '즐겨찾기 처리 중 오류가 발생했습니다.')
    }
  }

  return { toggleFavorite }
}
