'use client'
import React, { useState, useEffect } from 'react'
import { Product } from './types/product'
import ProductCard from './components/common/Card/cars'
import { useCart } from './context/cartContext'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FaSearch } from 'react-icons/fa'
import { useProduct } from './context/productContext'
import { useTheme } from '@mui/material/styles'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme()

  const { product } = useProduct()

  const filteredProducts =
    product && product.length > 0
      ? product.filter(
          (product) =>
            product &&
            product.title &&
            product.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : []

  const isInCart = (product: Product) => cartItems.some((item) => item.title === product.title)

  const { cartItems, addToCart } = useCart()

  return (
    <div
      className='flex flex-col justify-center items-center'
      style={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#feead2' }}
    >
      <TextField
        placeholder='Search Products'
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          width: '30%',
          marginTop: 4,
          marginBottom: -3,
          padding: '12px 16px',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />
      <div className='p-4 md:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8'>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            addToCart={addToCart}
            isInCart={isInCart(product)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
