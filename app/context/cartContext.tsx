'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Product } from '../types/product'

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  increaseQuantity: (index: number) => void
  decreaseQuantity: (index: number) => void
  removeFromCart: (product: Product) => void
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
})

interface CartProviderprops {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderprops> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    const existingProduct = cartItems.find((item) => item.title === product.title)

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.title === product.title ? { ...item, quantity: (item.quantity || 0) + 1 } : item,
      )
      setCartItems(updatedCart)
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }]
      setCartItems(updatedCart)
    }
  }

  const removeFromCart = (product: Product) => {
    const updatedCart = cartItems.filter((item) => item.title !== product.title)
    setCartItems(updatedCart)
  }

  const increaseQuantity = (index: number) => {
    const updatedCart = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: (item.quantity || 0) + 1 }
      }
      return item
    })
    setCartItems(updatedCart)
  }
  const decreaseQuantity = (index: number) => {
    const updatedCart = cartItems
      .map((item, i) => {
        if (i === index && item.quantity !== undefined && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      .filter((item) => item.quantity !== 0)
    setCartItems(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
