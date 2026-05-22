import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/firestore'

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart()
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setBuyer((previousBuyer) => ({ ...previousBuyer, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (cart.length === 0) {
      setError('No hay productos en el carrito para generar la compra.')
      return
    }

    setLoading(true)

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
    }

    try {
      const id = await createOrder(order)
      setOrderId(id)
      clearCart()
    } catch (submitError) {
      setError('No se pudo registrar la orden. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <Stack spacing={2} alignItems="flex-start">
        <Alert severity="success">Compra finalizada correctamente.</Alert>
        <Typography variant="h4">Tu numero de orden es: {orderId}</Typography>
        <Button component={Link} to="/" variant="contained">
          Volver al catalogo
        </Button>
      </Stack>
    )
  }

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Card sx={{ maxWidth: 520 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              id="name"
              name="name"
              label="Nombre completo"
              required
              value={buyer.name}
              onChange={handleChange}
            />

            <TextField
              id="phone"
              name="phone"
              label="Telefono"
              required
              value={buyer.phone}
              onChange={handleChange}
            />

            <TextField
              id="email"
              name="email"
              label="Correo electronico"
              type="email"
              required
              value={buyer.email}
              onChange={handleChange}
            />

            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? (
                <>
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                  Generando orden...
                </>
              ) : (
                'Confirmar compra'
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </section>
  )
}

export default Checkout
