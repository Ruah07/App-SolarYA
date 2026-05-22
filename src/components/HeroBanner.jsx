import { Link as RouterLink } from 'react-router-dom'
import { Bolt, CalculateRounded, Engineering, SolarPower } from '@mui/icons-material'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import BrandLogo from './BrandLogo'

function HeroBanner() {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        mb: 3,
        borderRadius: 2,
        color: '#fff',
        background:
          'linear-gradient(135deg, rgba(10,129,147,1) 0%, rgba(109,205,214,1) 62%, rgba(8,106,121,1) 100%)',
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BrandLogo size={28} />
          <Typography sx={{ fontWeight: 700 }}>SolarYa</Typography>
        </Stack>

        <Chip
          icon={<SolarPower sx={{ color: '#fff !important' }} />}
          label="Energia solar para todos"
          sx={{
            width: 'fit-content',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.4)',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />

        <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.6rem' } }}>
          Ahorra energia con paneles solares de alto rendimiento
        </Typography>

        <Typography sx={{ maxWidth: 700, opacity: 0.95 }}>
          Descubre soluciones residenciales, industriales y portatiles con una experiencia
          simple para cotizar, comprar y gestionar tu energia limpia.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            component={RouterLink}
            to="/cotizador"
            variant="contained"
            color="primary"
            startIcon={<CalculateRounded />}
          >
            Calcular tu proyecto
          </Button>
          <Button
            component={RouterLink}
            to="/category/residencial"
            variant="contained"
            sx={{ bgcolor: '#EFA100', '&:hover': { bgcolor: '#d18d00' } }}
            startIcon={<Bolt />}
          >
            Ver linea residencial
          </Button>
          <Button
            component={RouterLink}
            to="/category/industrial"
            variant="outlined"
            startIcon={<Engineering />}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.7)' }}
          >
            Ver linea industrial
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default HeroBanner
