import ItemCard from './ItemCard'
import { Grid, Typography } from '@mui/material'

function ItemList({ products }) {
  if (products.length === 0) {
    return <Typography>No hay productos para esta categoria.</Typography>
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ItemCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemList
