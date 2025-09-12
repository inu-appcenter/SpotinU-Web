import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'
import { AuthProvider } from '@/contexts/AuthContext.tsx'
import GlobalStyle from '@/styles/GlobalStyle'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <GlobalStyle />
    <App />
  </AuthProvider>,
)
// 좀 더 편하게 개발하기 위해 Strict Mode 제거.
