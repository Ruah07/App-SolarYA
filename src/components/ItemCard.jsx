import { Link } from 'react-router-dom'
import { FavoriteBorderRounded, FavoriteRounded } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUserData } from '../context/UserDataContext'
import { formatCurrency } from '../utils/formatters'

function ItemCard({ product }) {
  const { isFavorite, toggleFavorite } = useUserData()
  const favorite = isFavorite(product.id)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: 180 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6">{product.title}</Typography>
          <Stack direction="row" spacing={0.4} alignItems="center">
            <Chip size="small" label={product.category} />
            <Tooltip title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
              <IconButton
                size="small"
                sx={{
                  p: 0.4,
                  color: favorite ? '#db2777' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#ec4899',
                  },
                }}
                onClick={() => toggleFavorite(product)}
              >
                {favorite ? <FavoriteRounded fontSize="small" /> : <FavoriteBorderRounded fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Typography sx={{ mt: 1, color: 'primary.main', fontWeight: 700 }}>
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.2, color: 'text.secondary' }}>
          Stock disponible: {product.stock}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button component={Link} to={`/item/${product.id}`} fullWidth variant="contained">
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  )
}

export default ItemCard
