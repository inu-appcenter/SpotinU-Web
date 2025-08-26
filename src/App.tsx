// import MainPage from './pages/MainPage'

// export default function App() {
//   return <MainPage />
// }

// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import PlaceReviewPage from './pages/PlaceReviewPage'

// export default function App() {
//   return <PlaceReviewPage />
// }

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import PlaceReviewPage from './pages/PlaceReviewPage'
import VisitComplete from './pages/VisitCompletePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 작성 페이지 */}
        <Route path="/place/review" element={<PlaceReviewPage />} />

        {/* 방문만 기록 완료 페이지 */}
        <Route path="/visit/complete" element={<VisitComplete />} />

        {/* 기본 진입 시 작성 페이지로 */}
        <Route path="*" element={<Navigate to="/place/review" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
