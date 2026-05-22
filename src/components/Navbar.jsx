import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DarkModeRounded, LightModeRounded, MenuRounded, SettingsRounded } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import BrandLogo from './BrandLogo'
import CartWidget from './CartWidget'
import { useColorMode } from '../context/ColorModeContext'

const navLinks = [
  { to: '/perfil', label: 'Perfil' },
  { to: '/cotizador', label: 'Cotizador' },
  { to: '/', label: 'Todos' },
  { to: '/category/residencial', label: 'Residencial' },
  { to: '/category/industrial', label: 'Industrial' },
  { to: '/category/portatil', label: 'Portatil' },
]

function Navbar() {
  const { mode, setMode } = useColorMode()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [settingsAnchor, setSettingsAnchor] = useState(null)

  const handleOpenMenu = (event) => setMenuAnchor(event.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)
  const handleOpenSettings = (event) => setSettingsAnchor(event.currentTarget)
  const handleCloseSettings = () => setSettingsAnchor(null)
  const handleSelectMode = (nextMode) => {
    setMode(nextMode)
    handleCloseSettings()
  }

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          pt: 1.2,
          pb: 1,
          bgcolor: 'transparent',
          backdropFilter: 'none',
        }}
      >
        <Toolbar sx={{ display: 'grid', gap: 1.2 }}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              px: 1,
              py: 0.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(26, 34, 45, 0.82)'
                  : 'rgba(255, 255, 255, 0.86)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 10px 24px rgba(0, 0, 0, 0.35)'
                  : '0 6px 16px rgba(12, 23, 36, 0.08)',
            }}
          >
            <IconButton
              size="small"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(166, 180, 199, 0.16)'
                    : 'action.hover',
                transition: 'all 150ms ease',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(10, 129, 147, 0.24)'
                      : 'rgba(10, 129, 147, 0.16)',
                  color: 'primary.main',
                },
              }}
              onClick={handleOpenMenu}
            >
              <MenuRounded fontSize="small" />
            </IconButton>

            <Stack component={NavLink} to="/" direction="row" spacing={1.2} alignItems="center">
              <BrandLogo />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1.1 }}>
                  SolarYa
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                  Energia solar para todos
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.8}>
              <CartWidget />
              <IconButton
                size="small"
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(166, 180, 199, 0.16)'
                      : 'action.hover',
                  transition: 'all 150ms ease',
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(10, 129, 147, 0.24)'
                        : 'rgba(10, 129, 147, 0.16)',
                    color: 'primary.main',
                  },
                }}
                onClick={handleOpenSettings}
              >
                <SettingsRounded fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        </Toolbar>
      </AppBar>

      <Popover
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 300,
              maxWidth: 'calc(100vw - 24px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(26, 34, 45, 0.92)'
                  : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 14px 30px rgba(0, 0, 0, 0.45)'
                  : '0 12px 28px rgba(12, 23, 36, 0.14)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <Stack sx={{ p: 2, pb: 1.5 }} direction="row" spacing={1.2} alignItems="center">
            <BrandLogo />
            <Box>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1.1 }}>
                SolarYa
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                Menu principal
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <List sx={{ px: 1.2, py: 1.3 }}>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.to}
                component={NavLink}
                to={link.to}
                onClick={handleCloseMenu}
                sx={{
                  mb: 0.6,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(109, 205, 214, 0.12)'
                        : 'rgba(10, 129, 147, 0.08)',
                  },
                  '&.active': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(109, 205, 214, 0.2)'
                        : 'rgba(10, 129, 147, 0.14)',
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Stack sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              SolarYa · Energia solar para todos
            </Typography>
          </Stack>
        </Paper>
      </Popover>

      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              backdropFilter: 'blur(10px)',
            },
          },
        }}
      >
        <MenuItem selected={mode === 'light'} onClick={() => handleSelectMode('light')}>
          <LightModeRounded fontSize="small" sx={{ mr: 1.1 }} />
          Modo dia
        </MenuItem>
        <MenuItem selected={mode === 'dark'} onClick={() => handleSelectMode('dark')}>
          <DarkModeRounded fontSize="small" sx={{ mr: 1.1 }} />
          Modo noche
        </MenuItem>
      </Menu>
    </>
  )
}

export default Navbar
