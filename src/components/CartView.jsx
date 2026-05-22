import { Link } from 'react-router-dom'
import { DeleteOutlineRounded, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatters'

function CartView() {
  const { cart, removeItem, clearCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <Stack
        spacing={2}
        alignItems="flex-start"
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          bgcolor: 'rgba(238, 243, 247, 0.68)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h4">Tu carrito esta vacio</Typography>
        <Typography color="text.secondary">
          Agrega productos para comenzar tu simulacion de compra.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Volver al catalogo
        </Button>
      </Stack>
    )
  }

  return (
    <section>
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 2.5 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <ShoppingCartOutlined />
        </Avatar>
        <Box>
          <Typography variant="h4">Carrito de compras</Typography>
          <Typography color="text.secondary">Revisa tus productos antes de finalizar</Typography>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={1.5}>
            {cart.map((item) => (
              <Card
                key={item.id}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.74)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.8, flexWrap: 'wrap' }}>
                      <Chip label={`Cantidad: ${item.quantity}`} size="small" />
                      <Chip label={`Precio: ${formatCurrency(item.price)}`} size="small" />
                    </Stack>
                    <Typography sx={{ mt: 1, fontWeight: 600, color: 'primary.main' }}>
                      Subtotal: {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Box>

                  <Button
                    type="button"
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineRounded />}
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              position: { md: 'sticky' },
              top: 120,
              bgcolor: 'rgba(255, 255, 255, 0.78)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <CardContent>
              <Typography variant="h6">Resumen</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {cart.length} producto(s) en tu pedido
              </Typography>
              <Typography variant="h5" sx={{ mb: 2.5 }}>
                Total: {formatCurrency(totalPrice)}
              </Typography>
              <Stack spacing={1.2}>
                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  fullWidth
                >
                  Finalizar compra
                </Button>
                <Button type="button" variant="outlined" color="inherit" onClick={clearCart} fullWidth>
                  Vaciar carrito
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  )
}

export default CartView
