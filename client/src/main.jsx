import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header/header.jsx'
import Body from './Body/body.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Body />
  </StrictMode>,
)
