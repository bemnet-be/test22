import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Switch from '@mui/material/Switch'
import Badge from '@mui/material/Badge'
import { Theme } from '@mui/material'
import { darkTheme } from '../../../theme/themes'
import { useCart } from '../../../context/cartContext'
import CartDrawer from '../Cart/cart'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FaShop } from 'react-icons/fa6'

interface NavAppBarProps {
  onThemeToggle: () => void
  theme: Theme
}

const NavAppBar: React.FC<NavAppBarProps> = ({ theme, onThemeToggle }) => {
  const { cartItems } = useCart()

  const toggleDrawer = () => {
    setCartOpen(!cartOpen)
  }

  const [cartOpen, setCartOpen] = React.useState(false)
  const badgeContent = cartItems ? cartItems.length : 0

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CartDrawer open={cartOpen} onClose={toggleDrawer} />
      <AppBar
        position='static'
        sx={{ backgroundColor: theme === darkTheme ? '#180d00' : '#824700' }}
      >
        <Toolbar>
          <Typography variant='h3' component='div' sx={{ flexGrow: 1 }}>
            <FaShop />
          </Typography>
          <IconButton
            size='large'
            aria-label='cart'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={toggleDrawer}
            color='inherit'
          >
            <Badge badgeContent={badgeContent} color='warning'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Switch
            checked={theme === darkTheme}
            onChange={onThemeToggle}
            icon={<FaSun />}
            checkedIcon={<FaMoon />}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavAppBar
