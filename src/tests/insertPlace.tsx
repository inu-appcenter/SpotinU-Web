import axios from 'axios'
import { useRef, useState } from 'react'

const toBool = (s: string) => /^(true|1|y|yes)$/i.test(String(s).trim())
const withBearer = (t: string) => (t ? (t.startsWith('Bearer ') ? t : `Bearer ${t}`) : '')

export default function InsertPlaceMini() {
  const [baseUrl, setBaseUrl] = useState(
    import.meta.env.VITE_API_BASE_URL ?? 'https://spotinu-server.inuappcenter.kr',
  )
  const [token, setToken] = useState('')
  const [log, setLog] = useState('(로그)')

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [spotId, setSpotId] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const formRef = useRef<HTMLFormElement>(null)

  const submit = async () => {
    setLog('(요청 중...)')
    try {
      const fd = new FormData(formRef.current ?? undefined)
      const get = (k: string) => String(fd.get(k) ?? '')

      const payload = {
        latitude: get('latitude'),
        longitude: get('longitude'),
        name: get('name'),
        locationDetail: get('locationDetail'),
        description: get('description'),
        businessHours: get('businessHours') || undefined,
        businessHoursDetail: get('businessHoursDetail') || undefined,
        descriptionDetail: get('descriptionDetail') || undefined,
        placeType: get('placeType') as 'INDOOR' | 'OUTDOOR',
        sleepingAllowed: toBool(get('sleepingAllowed')),
        eatingAllowed: toBool(get('eatingAllowed')),
        hasPowerOutlet: toBool(get('hasPowerOutlet')),
        studyAllowed: toBool(get('studyAllowed')),
        entertainment: toBool(get('entertainment')),
        reservationRequired: toBool(get('reservationRequired')),
      }

      const res = await axios.post(`${baseUrl}/api/v1/spots/createNoPhotos`, payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: withBearer(token) } : {}),
        },
      })
      setLog(`${res.status} ${res.statusText}\n` + JSON.stringify(res.data, null, 2))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const st = err.response?.status ?? ''
        const tx = err.response?.statusText ?? ''
        const body = err.response?.data ?? err.message
        setLog(
          `X ${st} ${tx}\n` + (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
        )
      } else if (err instanceof Error) {
        setLog(`X ${err.message}`)
      } else {
        setLog('오류')
      }
    }
  }

  const list = async () => {
    setLog('(요청 중...)')
    try {
      const res = await axios.get(`${baseUrl}/api/v1/spots`, {
        params: { page, size },
        headers: { ...(token ? { Authorization: withBearer(token) } : {}) },
      })
      setLog(`${res.status} ${res.statusText}\n` + JSON.stringify(res.data, null, 2))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const st = err.response?.status ?? ''
        const tx = err.response?.statusText ?? ''
        const body = err.response?.data ?? err.message
        setLog(
          `X ${st} ${tx}\n` + (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
        )
      } else if (err instanceof Error) {
        setLog(`X ${err.message}`)
      } else {
        setLog('오류')
      }
    }
  }

  const getOne = async () => {
    if (!spotId) return setLog('spotId 입력')
    setLog('(요청 중...)')
    try {
      const res = await axios.get(`${baseUrl}/api/v1/spots/${spotId}`, {
        headers: { ...(token ? { Authorization: withBearer(token) } : {}) },
      })
      setLog(`${res.status} ${res.statusText}\n` + JSON.stringify(res.data, null, 2))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const st = err.response?.status ?? ''
        const tx = err.response?.statusText ?? ''
        const body = err.response?.data ?? err.message
        setLog(
          `X ${st} ${tx}\n` + (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
        )
      } else if (err instanceof Error) {
        setLog(`X ${err.message}`)
      } else {
        setLog('오류')
      }
    }
  }

  const delOne = async () => {
    if (!spotId) return setLog('spotId 입력')
    setLog('(요청 중...)')
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/spots/${spotId}`, {
        headers: { ...(token ? { Authorization: withBearer(token) } : {}) },
      })
      setLog(`${res.status} ${res.statusText}\n` + JSON.stringify(res.data, null, 2))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const st = err.response?.status ?? ''
        const tx = err.response?.statusText ?? ''
        const body = err.response?.data ?? err.message
        setLog(
          `X ${st} ${tx}\n` + (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
        )
      } else if (err instanceof Error) {
        setLog(`X ${err.message}`)
      } else {
        setLog('오류')
      }
    }
  }

  const createWithPhotos = async () => {
    setLog('(요청 중...)')
    try {
      const fdForm = new FormData(formRef.current ?? undefined)
      const get = (k: string) => String(fdForm.get(k) ?? '')
      const jsonPayload = {
        latitude: get('latitude'),
        longitude: get('longitude'),
        name: get('name'),
        locationDetail: get('locationDetail'),
        description: get('description'),
        businessHours: get('businessHours') || undefined,
        businessHoursDetail: get('businessHoursDetail') || undefined,
        descriptionDetail: get('descriptionDetail') || undefined,
        placeType: get('placeType') as 'INDOOR' | 'OUTDOOR',
        sleepingAllowed: toBool(get('sleepingAllowed')),
        eatingAllowed: toBool(get('eatingAllowed')),
        hasPowerOutlet: toBool(get('hasPowerOutlet')),
        studyAllowed: toBool(get('studyAllowed')),
        entertainment: toBool(get('entertainment')),
        reservationRequired: toBool(get('reservationRequired')),
      }

      const fd = new FormData()
      fd.append(
        'spotCreateRequest',
        new Blob([JSON.stringify(jsonPayload)], { type: 'application/json' }),
      )
      for (const f of files) fd.append('photos', f)

      const res = await axios.post(`${baseUrl}/api/v1/spots`, fd, {
        headers: { ...(token ? { Authorization: withBearer(token) } : {}) },
      })
      setLog(`${res.status} ${res.statusText}\n` + JSON.stringify(res.data, null, 2))
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const st = err.response?.status ?? ''
        const tx = err.response?.statusText ?? ''
        const body = err.response?.data ?? err.message
        setLog(
          `X ${st} ${tx}\n` + (typeof body === 'string' ? body : JSON.stringify(body, null, 2)),
        )
      } else if (err instanceof Error) {
        setLog(`X ${err.message}`)
      } else {
        setLog('오류')
      }
    }
  }

  const Row = ({ k, hint, def = '' }: { k: string; hint?: string; def?: string }) => (
    <div style={{ marginTop: 10 }}>
      <label htmlFor={`inp-${k}`} style={{ display: 'block', marginBottom: 4 }}>
        {k}
      </label>
      <input
        id={`inp-${k}`}
        name={k}
        defaultValue={def}
        onChange={() => {}}
        autoComplete="off"
        style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1' }}
        placeholder={k}
      />
      {hint && <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{hint}</div>}
    </div>
  )

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 680,
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <label style={{ display: 'block', marginTop: 8 }}>Base URL</label>
      <input
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1' }}
      />

      <label style={{ display: 'block', marginTop: 12 }}>JWT (Authorization)</label>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="(Bearer 자동 부착임)"
        style={{ width: '100%', padding: 8, border: '1px solid #cbd5e1' }}
      />

      <form ref={formRef}>
        <Row k="name" />
        <Row k="locationDetail" />
        <Row k="description" />
        <Row k="latitude" />
        <Row k="longitude" />
        <Row k="businessHours" />
        <Row k="businessHoursDetail" />
        <Row k="descriptionDetail" />
        <Row k="placeType" hint="INDOOR 또는 OUTDOOR" def="INDOOR" />
        <Row k="sleepingAllowed" hint="true/false, 1/0, yes/no" def="false" />
        <Row k="eatingAllowed" hint="true/false, 1/0, yes/no" def="false" />
        <Row k="hasPowerOutlet" hint="true/false, 1/0, yes/no" def="false" />
        <Row k="studyAllowed" hint="true/false, 1/0, yes/no" def="false" />
        <Row k="entertainment" hint="true/false, 1/0, yes/no" def="false" />
        <Row k="reservationRequired" hint="true/false, 1/0, yes/no" def="false" />
      </form>

      <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
        <button onClick={submit} style={{ padding: '8px 12px' }}>
          POST /api/v1/spots/createNoPhotos
        </button>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
          />
          <button onClick={createWithPhotos} style={{ padding: '8px 12px' }}>
            POST /api/v1/spots (multipart)
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <label>
            page{' '}
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              style={{ width: 80, marginLeft: 6 }}
            />
          </label>
          <label>
            size{' '}
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{ width: 80, marginLeft: 6 }}
            />
          </label>
          <button onClick={list} style={{ padding: '8px 12px' }}>
            GET /api/v1/spots
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            placeholder="spotId"
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
            style={{ flex: 1, padding: 8, border: '1px solid #cbd5e1' }}
          />
          <button onClick={getOne} style={{ padding: '8px 12px' }}>
            GET /api/v1/spots/{'{spotId}'}
          </button>
          <button onClick={delOne} style={{ padding: '8px 12px', background: '#ffaaaaff' }}>
            DELETE /api/v1/spots/{'{spotId}'}
          </button>
        </div>
      </div>

      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: '#0f172a',
          color: '#e2e8f0',
          whiteSpace: 'pre-wrap',
        }}
      >
        {log}
      </pre>
    </div>
  )
}
