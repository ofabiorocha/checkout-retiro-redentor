import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EventPage from '@/pages/EventPage'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <EventPage /> },
  // você pode adicionar outras rotas depois:
  // { path: '/success', element: <SuccessPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
