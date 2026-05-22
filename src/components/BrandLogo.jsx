import { Box } from '@mui/material'

function BrandLogo({ size = 34 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 1.5,
        bgcolor: '#0A8193',
        position: 'relative',
        overflow: 'hidden',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          bgcolor: '#D6F3F8',
          opacity: 0.95,
        },
        '&::before': {
          width: '18%',
          height: '100%',
          left: '41%',
          top: 0,
        },
        '&::after': {
          width: '100%',
          height: '18%',
          top: '41%',
          left: 0,
        },
      }}
    />
  )
}

export default BrandLogo
