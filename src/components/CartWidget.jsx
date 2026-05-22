import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatters'

function CartWidget() {
  const { cart, totalItems, totalPrice, removeItem } = useCart()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isOpen = Boolean(anchorEl)

  return (
    <>
      <IconButton
        size="small"
        sx={{
          bgcolor: '#0A8193',
          color: '#fff',
          transition: 'all 150ms ease',
          '&:hover': {
            bgcolor: '#086a79',
            color: '#fff',
          },
        }}
        onClick={handleOpen}
      >
        <Badge badgeContent={totalItems} color="secondary" max={99}>
          <ShoppingCartCheckoutIcon fontSize="small" />
        </Badge>
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 340,
              maxWidth: 'calc(100vw - 24px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(26, 34, 45, 0.9)'
                  : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            },
          },
        }}
      >
        <Box sx={{ p: 1.6 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Carrito de compras
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {totalItems} producto(s)
          </Typography>
        </Box>
        <Divider />

        <Stack spacing={1} sx={{ p: 1.6, maxHeight: 260, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <Typography color="text.secondary">Tu carrito esta vacio.</Typography>
          ) : (
            cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 1.1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  display: 'grid',
                  gap: 0.5,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cantidad: {item.quantity}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    {formatCurrency(item.price * item.quantity)}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeItem(item.id)}>
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            ))
          )}
        </Stack>

        <Divider />
        <Stack spacing={1.2} sx={{ p: 1.6 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Total: {formatCurrency(totalPrice)}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button component={Link} to="/cart" variant="outlined" fullWidth onClick={handleClose}>
              Ver carrito
            </Button>
            <Button component={Link} to="/checkout" variant="contained" fullWidth onClick={handleClose}>
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}

export default CartWidget
