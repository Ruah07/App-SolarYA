import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const UserDataContext = createContext(null)

const FAVORITES_KEY = 'solarya-favorites'
const QUOTES_KEY = 'solarya-saved-quotes'

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
    stock: product.stock,
    watts: product.watts,
  }
}

export function UserDataProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    safeParse(localStorage.getItem(FAVORITES_KEY), []),
  )
  const [savedQuotes, setSavedQuotes] = useState(() =>
    safeParse(localStorage.getItem(QUOTES_KEY), []),
  )

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(savedQuotes))
  }, [savedQuotes])

  const isFavorite = (productId) => favorites.some((favorite) => favorite.id === productId)

  const toggleFavorite = (product) => {
    setFavorites((previousFavorites) => {
      const exists = previousFavorites.some((favorite) => favorite.id === product.id)

      if (exists) {
        return previousFavorites.filter((favorite) => favorite.id !== product.id)
      }

      return [...previousFavorites, normalizeProduct(product)]
    })
  }

  const saveQuote = (quote) => {
    setSavedQuotes((previousQuotes) => [
      { ...quote, id: `quote-${Date.now()}` },
      ...previousQuotes,
    ])
  }

  const removeQuote = (quoteId) => {
    setSavedQuotes((previousQuotes) =>
      previousQuotes.filter((savedQuote) => savedQuote.id !== quoteId),
    )
  }

  const value = useMemo(
    () => ({
      favorites,
      savedQuotes,
      isFavorite,
      toggleFavorite,
      saveQuote,
      removeQuote,
    }),
    [favorites, savedQuotes],
  )

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

export function useUserData() {
  const context = useContext(UserDataContext)

  if (!context) {
    throw new Error('useUserData debe usarse dentro de UserDataProvider')
  }

  return context
}
