import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/** Vite `base: './'` — Router עדיין רץ על נתיב לוגי `/` */
const rawBase = import.meta.env.BASE_URL
const basename =
  rawBase === '/' || rawBase === './' || rawBase === ''
    ? undefined
    : rawBase.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
