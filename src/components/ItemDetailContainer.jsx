import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Box, CircularProgress } from '@mui/material'
import ItemDetail from './ItemDetail'
import { getProductById } from '../services/firestore'

function ItemDetailContainer() {
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    getProductById(itemId)
      .then((response) => {
        if (!response) {
          setError('Producto no encontrado.')
          return
        }
        setProduct(response)
      })
      .catch(() => setError('No se pudo cargar el detalle del producto.'))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) {
    return (
      <Box sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return <ItemDetail product={product} />
}

export default ItemDetailContainer
