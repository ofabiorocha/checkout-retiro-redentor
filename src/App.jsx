import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventPage from '@/pages/EventPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route basename={import.meta.env.VITE_BASE_PATH || '/'} element={<EventPage />} />
        {/* 
          Espaço reservado para crescimento futuro, por exemplo:
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
        */}
      </Routes>
    </BrowserRouter>
  )
}
