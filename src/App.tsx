// export default function App() {
//   return <MainPage />
// }

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import InsertPlaceMini from '@/tests/insertPlace'

// import BottomNavBar from '@/components/Common/BottomNavBar'
// import MainPage from '@/pages/MainPage'
// import MyCampusMap from '@/pages/MyCampusMap'
// import MyPage from '@/pages/MyPage.tsx'
// import PlaceDetails from '@/pages/PlaceDetails'
// import Register from '@/pages/Register.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tests/insert-place" element={<InsertPlaceMini />} />
      </Routes>
      {/* <BottomNavBar /> */}
    </BrowserRouter>
  )
}
