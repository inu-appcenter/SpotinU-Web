import { useEffect, useState } from 'react'

import api from '@/lib/axios.ts'
import type { PlaceDetails } from '@/types/PlaceDetailsType'

const usePlaceDetails = (spotId: number) => {
  const [place, setPlace] = useState<PlaceDetails | null>(null)

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const res = await api.get(`/api/v1/spots/${spotId}`)
        console.log('API 요청 URL:', `/api/v1/spots/${spotId}`)
        console.log('API 응답:', res.data)
        setPlace(res.data.data)
      } catch (err) {
        console.error(' 상세정보 실패 :', err)
      }
    }

    if (spotId) {
      fetchPlaceDetails().catch(console.error)
    }
  }, [spotId])

  return { place }
}

export default usePlaceDetails
