'use clinet'
import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci'
import { Product } from '../../../types/product'
import { useCart } from '../../../context/cartContext'
import { Link } from 'react-router-dom'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { decreaseQuantity, increaseQuantity, cartItems } = useCart()
  const theme = useTheme()

  const router = useRouter()

  const handleCheckout = (product: Product) => {
    handleClose()
    router.push('/checkout')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={{ width: 300 }} role='presentation'>
        <Typography variant='h5' align='center'>
          Your Cart
        </Typography>
        {/* <Divider /> */}

        {cartItems.length === 0 ? (
          <Typography variant='body1' align='center'>
            <Divider />
            Empty Cart
          </Typography>
        ) : (
          <List>
            {cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant='square'>
                      <CardMedia component='img' height='50' image={item?.images[0]} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={`$${item.price}`} />
                  <IconButton onClick={() => decreaseQuantity(index)}>
                    <CiCircleMinus />
                  </IconButton>
                  <Typography variant='body1'>{item.quantity}</Typography>
                  <IconButton onClick={() => increaseQuantity(index)}>
                    <CiCirclePlus />
                  </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
            <Link to={{ pathname: '/checkout' }} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '7px 16px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant='contained'
                  fullWidth
                  onClick={() => handleCheckout(cartItems[0])}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#fc8a00' : '#593100',
                    backgroundColor: theme.palette.mode === 'dark' ? '#593100' : '#fc8a00',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                >
                  Checkout
                </Button>
              </div>
            </Link>
          </List>
        )}
      </Box>
    </Drawer>
  )
}

export default CartDrawer
