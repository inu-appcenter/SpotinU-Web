import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)
// 좀 더 편하게 개발하기 위해 Strict Mode 제거했음.
