import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ThemeContextProvider from './context/ThemeContext'

// Commented out React.StrictMode to prevent fetch from console logging more than once

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </>
  // </React.StrictMode>
)
