import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

function renderApp() {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    console.error('Elemento #root não encontrado no index.html')
    return
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

renderApp()
