import { useEffect, useState } from 'react'

import { api } from '@/apis/api'
import type { PlaceDetails } from '@/types/PlaceDetailsType'

const usePlaceDetails = (spotId: number) => {
  const [place, setPlace] = useState<PlaceDetails | null>(null)

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const res = await api.get(`/spots/${spotId}`)
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
