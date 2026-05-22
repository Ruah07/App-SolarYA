import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ColorModeProvider } from './context/ColorModeContext'
import { UserDataProvider } from './context/UserDataContext'
import { createAppTheme } from './theme'

const THEME_STORAGE_KEY = 'solarya-theme-mode'

function AppProviders() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY)
    return savedMode === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  const theme = useMemo(() => createAppTheme(mode), [mode])

  const colorModeValue = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode],
  )

  return (
    <ColorModeProvider value={colorModeValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <CartProvider>
            <UserDataProvider>
              <App />
            </UserDataProvider>
          </CartProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
