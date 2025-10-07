import type { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { getSpot } from '@/apis/spot'
import type { SpotDetail } from '@/types/spot'

function getErrMsg(e: unknown) {
  const err = e as AxiosError<{ message?: string }>
  return err.response?.data?.message ?? err.message ?? '장소 정보를 불러오지 못했어요.'
}

export function useSpot(spotId: number | null) {
  const [data, setData] = useState<SpotDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (spotId == null) {
      setData(null)
      setError(null)
      return
    }

    let alive = true

    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const s = await getSpot(spotId)
        if (alive) {
          setData(s)
        }
      } catch (e) {
        if (alive) {
          setError(getErrMsg(e))
        }
      } finally {
        if (alive) {
          setLoading(false)
        }
      }
    })()

    return () => {
      alive = false
    }
  }, [spotId])

  return { data, loading, error }
}
