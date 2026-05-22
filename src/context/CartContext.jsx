import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (product, quantity) => {
    setCart((previousCart) => {
      const itemInCart = previousCart.find((item) => item.id === product.id)

      if (itemInCart) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...previousCart, { ...product, quantity }]
    })
  }

  const removeItem = (itemId) => {
    setCart((previousCart) => previousCart.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  )

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}
