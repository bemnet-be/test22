import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import { Product } from '../../../types/product'
import { Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import Fab from '@mui/material/Fab'
import { TiPlus } from 'react-icons/ti'
import { TiTick } from 'react-icons/ti'
import { useCart } from '../../../context/cartContext'
import { useTheme } from '@mui/material/styles'

interface RecipeReviewCardProps {
  addToCart: (product: Product) => void
  product: Product
  isInCart: boolean
}
const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({ addToCart, isInCart, product }) => {
  const { removeFromCart } = useCart()
  const theme = useTheme()

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product)
    } else {
      addToCart(product)
    }
  }

  return (
    <div className='border my-2 py-2 md:py-4 lg:py-8'>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component='img' height='200' image={product?.images[0]} alt={product.title} />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {product.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ${product.price}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <Rating name='read-only' value={4.1} readOnly size='small' />
          </div>
        </CardContent>
        <CardActions
          disableSpacing
          className='flex justify-center'
          style={{ alignItems: 'center' }}
        >
          <IconButton aria-label='add to cart' onClick={handleAddToCart} className='w-full'>
            {isInCart ? (
              <Fab variant='extended' size='medium' className='w-full'>
                <TiTick />
                Added
              </Fab>
            ) : (
              <Fab
                variant='extended'
                size='medium'
                className='w-full'
                sx={{
                  backgroundColor: theme.palette.mode === 'light' ? '#fc8a00' : '#593100',
                  color: theme.palette.mode === 'light' ? '#dark' : '#fc8a00',
                }}
              >
                <TiPlus />
                Add To Cart
              </Fab>
            )}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default RecipeReviewCard
