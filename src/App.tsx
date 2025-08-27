// export default function App() {
//   return <MainPage />
// }

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import BottomNavBar from './components/Common/BottomNavBar'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
// import MyCampusMap from './pages/MyCampusMap'
import PlaceDetails from './pages/PlaceDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/places" element={<PlaceDetails />} />
        {/* <Route path="/my-campus-map" element={<MyCampusMap />} /> */}
        <Route path="/my-page" element={<LoginPage />} />
      </Routes>
      <BottomNavBar />
    </BrowserRouter>
  )
}
