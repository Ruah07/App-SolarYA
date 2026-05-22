import { createTheme } from '@mui/material/styles'

export function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0A8193',
        dark: '#086a79',
      },
      secondary: {
        main: '#6DCDD6',
      },
      warning: {
        main: '#EFA100',
      },
      background: {
        default: isDark ? '#0F141B' : '#F7F8FA',
        paper: isDark ? '#1A222D' : '#ffffff',
      },
      text: {
        primary: isDark ? '#E9EEF5' : '#1D2128',
        secondary: isDark ? '#A6B4C7' : '#6B7280',
      },
      divider: isDark ? '#2C3947' : '#DDE5EC',
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: ['Poppins', 'Inter', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: isDark ? '1px solid #2C3947' : '1px solid #E6ECF1',
            boxShadow: isDark
              ? '0px 8px 24px rgba(0, 0, 0, 0.35)'
              : '0px 8px 28px rgba(29, 33, 40, 0.06)',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            transition: 'transform 150ms ease, background-color 150ms ease, color 150ms ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'transform 150ms ease, background-color 150ms ease, color 150ms ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            transition: 'all 150ms ease',
            '&:hover': {
              color: '#0A8193',
              backgroundColor: isDark ? 'rgba(109, 205, 214, 0.12)' : 'rgba(10, 129, 147, 0.1)',
            },
          },
        },
      },
    },
  })
}
