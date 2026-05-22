import { createContext, useContext } from 'react'

const ColorModeContext = createContext(null)

export function ColorModeProvider({ value, children }) {
  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
}

export function useColorMode() {
  const context = useContext(ColorModeContext)

  if (!context) {
    throw new Error('useColorMode debe usarse dentro de ColorModeProvider')
  }

  return context
}
