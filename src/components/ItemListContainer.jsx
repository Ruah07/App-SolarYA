import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import ItemList from './ItemList'
import { getProducts } from '../services/firestore'
import HeroBanner from './HeroBanner'

function ItemListContainer() {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    getProducts(categoryId)
      .then((response) => setProducts(response))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setLoading(false))
  }, [categoryId])

  return (
    <section>
      {!categoryId && <HeroBanner />}
      <Typography variant="h4" gutterBottom>
        {categoryId
          ? `Categoria: ${categoryId.charAt(0).toUpperCase()}${categoryId.slice(1)}`
          : 'Paneles solares para tu proyecto'}
      </Typography>
      {loading && (
        <Box sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <ItemList products={products} />}
    </section>
  )
}

export default ItemListContainer
