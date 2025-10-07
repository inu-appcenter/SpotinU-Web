import { AxiosError } from 'axios'

import { api } from './api'

import type { PageResult, SpotDetail, SpotListItem } from '@/types/spot'

type Envelope<T> = { status: number; message: string; data: T }

export async function getSpots(params?: { page?: number; size?: number }) {
  const { page = 0, size = 10 } = params ?? {}
  const res = await api.get<Envelope<PageResult<SpotListItem>>>('/spots', {
    params: { page, size },
  })
  return res.data.data
}

export async function getSpot(spotId: number) {
  const res = await api.get<Envelope<SpotDetail>>(`/spots/${spotId}`)
  return res.data.data
}

export function getErrMsg(e: unknown, fallback = '요청 처리 중 오류가 발생') {
  const err = e as AxiosError<{ message?: string }>
  return err.response?.data?.message ?? fallback
}
