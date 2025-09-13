import { BrowserRouter, Route, Routes } from 'react-router-dom'

import InsertPlace from '@/tests/insertPlace'
import BottomNavBar from '@/components/Common/BottomNavBar'
import LoginPage from '@/pages/LoginPage'
import MainPage from '@/pages/MainPage'
import MyCampusMap from '@/pages/MyCampusMap'
import MyPage from '@/pages/MyPage'
import PlaceDetails from '@/pages/PlaceDetails'
import PlaceReviewPage from '@/pages/PlaceReviewPage'
import ProfileEdit from '@/pages/ProfileEdit'
import RecentVisit from '@/pages/RecentVisit'
import Register from '@/pages/Register.tsx'
import VisitCompletePage from '@/pages/VisitCompletePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tests/insert-place" element={<InsertPlace />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/places/:id" element={<PlaceDetails />} />
        <Route path="/my-campus-map" element={<MyCampusMap />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews/history" element={<RecentVisit />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/place/review" element={<PlaceReviewPage />} />
        <Route path="/place/review/edit" element={<PlaceReviewPage />} />
        <Route path="/visit/complete" element={<VisitCompletePage />} />
      </Routes>
      <BottomNavBar />
    </BrowserRouter>
  )
}
