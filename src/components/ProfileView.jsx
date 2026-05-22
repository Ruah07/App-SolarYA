import { Link } from 'react-router-dom'
import {
  AccountCircleRounded,
  DeleteOutlineRounded,
  FavoriteRounded,
  RequestQuoteRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { useUserData } from '../context/UserDataContext'
import { formatCurrency } from '../utils/formatters'

function ProfileView() {
  const { addItem } = useCart()
  const { favorites, savedQuotes, toggleFavorite, removeQuote } = useUserData()

  return (
    <section>
      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2.5 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <AccountCircleRounded />
        </Avatar>
        <Box>
          <Typography variant="h4">Perfil</Typography>
          <Typography color="text.secondary">
            Gestiona tus favoritos y cotizaciones guardadas.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <FavoriteRounded color="error" />
                <Typography variant="h6">Favoritos</Typography>
              </Stack>

              {favorites.length === 0 ? (
                <Typography color="text.secondary">
                  Aun no tienes paneles favoritos. Puedes marcarlos desde el catalogo o el detalle.
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {favorites.map((product) => (
                    <Card key={product.id} variant="outlined">
                      <CardContent
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1.5,
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          flexDirection: { xs: 'column', sm: 'row' },
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{product.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(product.price)}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1}>
                          <Button component={Link} to={`/item/${product.id}`} size="small" variant="outlined">
                            Ver
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<ShoppingCartRounded />}
                            onClick={() => addItem(product, 1)}
                          >
                            Agregar
                          </Button>
                          <IconButton color="error" size="small" onClick={() => toggleFavorite(product)}>
                            <DeleteOutlineRounded />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <RequestQuoteRounded color="primary" />
                <Typography variant="h6">Cotizaciones guardadas</Typography>
              </Stack>

              {savedQuotes.length === 0 ? (
                <Typography color="text.secondary">
                  No hay cotizaciones guardadas todavia.
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {savedQuotes.map((quote) => (
                    <Card key={quote.id} variant="outlined">
                      <CardContent sx={{ display: 'grid', gap: 0.6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                          {quote.recommendedPanelTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Perfil: {quote.profileLabel} · {new Date(quote.createdAt).toLocaleDateString('es-CO')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Paneles: {quote.recommendedPanelCount} · Inversion:{' '}
                          {formatCurrency(quote.totalInvestment)}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.8 }}>
                          <Button
                            component={Link}
                            to={`/item/${quote.recommendedPanelId}`}
                            size="small"
                            variant="outlined"
                          >
                            Ver panel
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() =>
                              addItem(
                                {
                                  id: quote.recommendedPanelId,
                                  title: quote.recommendedPanelTitle,
                                  price: quote.recommendedPanelPrice,
                                  image: quote.recommendedPanelImage,
                                  category: quote.recommendedPanelCategory,
                                  stock: quote.recommendedPanelStock,
                                  watts: quote.recommendedPanelWatts,
                                },
                                quote.recommendedPanelCount,
                              )
                            }
                          >
                            Agregar pack
                          </Button>
                          <IconButton color="error" size="small" onClick={() => removeQuote(quote.id)}>
                            <DeleteOutlineRounded />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 2 }} />
              <Button component={Link} to="/cotizador" variant="outlined" fullWidth>
                Ir al cotizador
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  )
}

export default ProfileView
