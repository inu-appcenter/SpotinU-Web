import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import PlaceReviewPage from './pages/PlaceReviewPage'
import VisitCompletePage from './pages/VisitCompletePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/place/review" replace />} />

        <Route path="/place/review" element={<PlaceReviewPage />} />
        <Route path="/visit/complete" element={<VisitCompletePage />} />

        <Route path="*" element={<Navigate to="/place/review" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
