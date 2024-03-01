'use client'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci'
import { useCart } from '../context/cartContext'
import { useProduct } from '../context/productContext'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Fab from '@mui/material/Fab'
import { useTheme } from '@mui/material/styles'

interface CheckOutPageProps {}

const Page: React.FC<CheckOutPageProps> = () => {
  const { product } = useProduct()

  const theme = useTheme()

  const { cartItems, increaseQuantity, decreaseQuantity } = useCart()

  if (!product) {
    return (
      <div>
        <Typography variant='h5' align='center'>
          Product Not Found
        </Typography>
        <Typography variant='body1' align='center'>
          The product information is not available.
        </Typography>
      </div>
    )
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 500, marginX: 10, marginTop: 10, paddingBottom: 5 }}>
            <Typography sx={{ marginX: 2, marginTop: 3, marginBottom: 3 }}>
              Contact Information
            </Typography>
            <div>
              <TextField
                label='Email or Phone Number'
                id='outlined-adornment-amount'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '52ch' }}
              />
            </div>
            <Typography sx={{ marginX: 2, marginTop: 3, marginBottom: 3 }}>
              Shipping Address
            </Typography>
            <div>
              <TextField
                label='First Name'
                id='outlined-start-adornment'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '25ch' }}
              />
              <TextField
                label='Last Name'
                id='outlined-adornment-weight'
                sx={{ marginTop: 1, marginBottom: 1, width: '25ch' }}
              />
            </div>
            <div>
              <TextField
                label='Address Line 1'
                id='outlined-adornment-amount'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '52ch' }}
              />
            </div>
            <div>
              <TextField
                label='Address Line 2'
                id='outlined-adornment-amount'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '52ch' }}
              />
            </div>
            <div>
              <TextField
                label='City / Town'
                id='outlined-adornment-amount'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '52ch' }}
              />
            </div>
            <div>
              <TextField
                label='Country'
                id='outlined-start-adornment'
                sx={{ marginX: 2, marginTop: 1, marginBottom: 1, width: '25ch' }}
              />
              <TextField
                label='POSTAL / ZIP'
                id='outlined-adornment-weight'
                sx={{ marginTop: 1, marginBottom: 1, width: '25ch' }}
              />
            </div>
          </Card>
          <FormControlLabel
            value=''
            control={<Checkbox />}
            label='save this information for next time'
            labelPlacement='end'
          />
          <Fab
            variant='extended'
            size='medium'
            className='w-full'
            sx={{
              backgroundColor: theme.palette.mode === 'light' ? '#fc8a00' : '#593100',
              color: theme.palette.mode === 'light' ? '#dark' : '#fc8a00', // Text color
            }}
          >
            Complete Order
          </Fab>
        </Grid>
        {cartItems.length === 0 ? (
          <Typography variant='body1' align='center'>
            Empty Cart
          </Typography>
        ) : (
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 500, marginX: 10, marginTop: 10, paddingBottom: 5 }}>
              <List>
                {cartItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant='square'>
                          <CardMedia component='img' height='50' image={item?.images[0]} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} secondary={item.price} />
                      <IconButton onClick={() => decreaseQuantity(index)}>
                        <CiCircleMinus />
                      </IconButton>
                      <Typography variant='body1'>{item.quantity}</Typography>
                      <IconButton onClick={() => increaseQuantity(index)}>
                        <CiCirclePlus />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {/* Subtotal */}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='body1'>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography variant='body1'>
                        $
                        {cartItems.reduce(
                          (acc, cur) => acc + (parseFloat(cur.price) ?? 0) * (cur.quantity ?? 0),
                          0,
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {/* Shipping */}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='body1'>Shipping</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography variant='body1'>$30</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                {/* Total Price */}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='body1'>Total Price</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography variant='body1'>
                        $
                        {(cartItems.reduce(
                          (acc, cur) => acc + (parseFloat(cur.price) ?? 0) * (cur.quantity ?? 0),
                          0,
                        ) ?? 0) + 30}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Page
