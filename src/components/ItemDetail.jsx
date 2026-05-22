import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Add, FavoriteBorderRounded, FavoriteRounded, Remove } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { useCart } from '../context/CartContext'
import { useUserData } from '../context/UserDataContext'
import { formatCurrency } from '../utils/formatters'

function ItemDetail({ product }) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useUserData()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const favorite = isFavorite(product.id)

  const maxQuantity = useMemo(() => Math.max(1, product.stock), [product.stock])

  const increase = () => setQuantity((prev) => Math.min(maxQuantity, prev + 1))
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
  }

  return (
    <Card sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '360px 1fr' } }}>
      <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: { xs: 220, md: '100%' } }} />
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{product.title}</Typography>
          <Tooltip title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            <IconButton
              sx={{
                p: 0.4,
                color: favorite ? '#db2777' : 'text.secondary',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#ec4899',
                },
              }}
              onClick={() => toggleFavorite(product)}
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {favorite ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography sx={{ color: 'primary.main', fontWeight: 700, mt: 1 }}>
          {formatCurrency(product.price)}
        </Typography>
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Stock disponible: {product.stock}
        </Typography>

        {!added ? (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 3, flexWrap: 'wrap' }}>
            <Button type="button" variant="outlined" onClick={decrease}>
              <Remove />
            </Button>
            <Box sx={{ minWidth: 30, textAlign: 'center', fontWeight: 700 }}>{quantity}</Box>
            <Button type="button" variant="outlined" onClick={increase}>
              <Add />
            </Button>
            <Button type="button" variant="contained" onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </Stack>
        ) : (
          <Button component={Link} to="/cart" variant="contained" sx={{ mt: 3 }}>
            Ir al carrito
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ItemDetail
