import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  AccountCircleRounded,
  BoltRounded,
  CalculateRounded,
  CottageRounded,
  FactoryRounded,
} from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

const items = [
  { label: 'Inicio', value: '/', icon: <CottageRounded fontSize="small" /> },
  { label: 'Cotizador', value: '/cotizador', icon: <CalculateRounded fontSize="small" /> },
  {
    label: 'Residencial',
    value: '/category/residencial',
    icon: <BoltRounded fontSize="small" />,
  },
  {
    label: 'Industrial',
    value: '/category/industrial',
    icon: <FactoryRounded fontSize="small" />,
  },
  { label: 'Perfil', value: '/perfil', icon: <AccountCircleRounded fontSize="small" /> },
]

function Footer() {
  const location = useLocation()
  const currentValue = useMemo(() => {
    const exact = items.find((item) => item.value === location.pathname)
    return exact ? exact.value : '/'
  }, [location.pathname])

  return (
    <Paper
      component="footer"
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(760px, calc(100% - 20px))',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(20, 29, 40, 0.84)'
            : 'rgba(246, 248, 251, 0.72)',
        backdropFilter: 'blur(14px)',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <BottomNavigation
        showLabels
        value={currentValue}
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(20, 29, 40, 0.66)'
              : 'rgba(246, 248, 251, 0.62)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {items.map((item) => (
          <BottomNavigationAction
            key={item.value}
            component={NavLink}
            to={item.value}
            value={item.value}
            label={item.label}
            icon={item.icon}
            sx={{
              transition: 'all 150ms ease',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(109, 205, 214, 0.12)'
                    : 'rgba(10, 129, 147, 0.1)',
              },
              '&.active': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default Footer
