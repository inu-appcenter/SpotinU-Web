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

// import SelectPost from './pages/SelectPost'

// function App() {
//   return (
//     <div style={{ height: '100vh' }}>
//       {/* 권한 없음 상태 미리보기 */}
//       <SelectPost hasPermission={false} onOpenSettings={() => alert('설정 클릭됨')} />

//       {/* 권한 있음 상태 보고 싶으면 아래 주석 해제 */}
//       {/* <SelectPost hasPermission={true} /> */}
//     </div>
//   )
// }

// export default App
