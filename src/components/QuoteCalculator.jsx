import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import { formatCurrency } from '../utils/formatters'
import { useCart } from '../context/CartContext'
import { useUserData } from '../context/UserDataContext'
import { getProducts } from '../services/firestore'

function extractWatts(product) {
  if (typeof product.watts === 'number' && product.watts > 0) {
    return product.watts
  }

  const match = product.title?.match(/(\d+)\s*w/i)
  if (match) {
    return Number(match[1])
  }

  if (product.category === 'industrial') {
    return 450
  }

  if (product.category === 'residencial') {
    return 250
  }

  return 200
}

function isPanelProduct(product) {
  return /panel/i.test(product.title) || typeof product.watts === 'number'
}

const recommendationProfiles = [
  {
    id: 'economico',
    label: 'Economico',
    description: 'Prioriza menor inversion inicial.',
  },
  {
    id: 'equilibrado',
    label: 'Equilibrado',
    description: 'Balance entre inversion y cantidad de paneles.',
  },
  {
    id: 'alto-rendimiento',
    label: 'Alto rendimiento',
    description: 'Prioriza mayor potencia instalada y menos paneles.',
  },
]

function QuoteCalculator() {
  const { addItem } = useCart()
  const { saveQuote } = useUserData()
  const [monthlyConsumption, setMonthlyConsumption] = useState(350)
  const [sunHours, setSunHours] = useState(4.5)
  const [tariff, setTariff] = useState(900)
  const [recommendationProfile, setRecommendationProfile] = useState('economico')
  const [panelOptions, setPanelOptions] = useState([])
  const [selectedPanelId, setSelectedPanelId] = useState('')
  const [loadingPanels, setLoadingPanels] = useState(true)
  const [loadingError, setLoadingError] = useState('')
  const [addedMessage, setAddedMessage] = useState('')

  useEffect(() => {
    setLoadingPanels(true)
    setLoadingError('')

    getProducts()
      .then((products) => {
        const normalizedPanels = products
          .filter((product) => product.price > 0 && product.stock > 0 && isPanelProduct(product))
          .map((product) => ({
            ...product,
            watts: extractWatts(product),
          }))
          .sort((a, b) => a.watts - b.watts)

        setPanelOptions(normalizedPanels)
        if (normalizedPanels.length > 0) {
          setSelectedPanelId(normalizedPanels[0].id)
        }
      })
      .catch(() => {
        setLoadingError('No se pudo cargar el catalogo para el cotizador.')
      })
      .finally(() => setLoadingPanels(false))
  }, [])

  const selectedPanel = useMemo(
    () => panelOptions.find((panel) => panel.id === selectedPanelId) ?? null,
    [panelOptions, selectedPanelId],
  )

  const analysis = useMemo(() => {
    if (panelOptions.length === 0) {
      return null
    }

    const efficiencyFactor = 0.8
    const requiredSystemKw = monthlyConsumption / (sunHours * 30 * efficiencyFactor)

    const scenarios = panelOptions.map((panel) => {
      const panelCount = Math.max(1, Math.ceil((requiredSystemKw * 1000) / panel.watts))
      const installedPowerKw = (panelCount * panel.watts) / 1000
      const equipmentCost = panelCount * panel.price
      const installationCost = equipmentCost * 0.2
      const totalInvestment = equipmentCost + installationCost
      const monthlySaving = monthlyConsumption * tariff
      const annualSaving = monthlySaving * 12
      const paybackYears = annualSaving > 0 ? totalInvestment / annualSaving : 0

      return {
        panel,
        panelCount,
        installedPowerKw,
        equipmentCost,
        installationCost,
        totalInvestment,
        monthlySaving,
        annualSaving,
        paybackYears,
      }
    })

    let recommendedScenario = scenarios[0]

    if (recommendationProfile === 'economico') {
      recommendedScenario = [...scenarios].sort((a, b) => a.totalInvestment - b.totalInvestment)[0]
    } else if (recommendationProfile === 'equilibrado') {
      recommendedScenario = [...scenarios].sort((a, b) => {
        const scoreA = a.totalInvestment + a.panelCount * 180000
        const scoreB = b.totalInvestment + b.panelCount * 180000
        return scoreA - scoreB
      })[0]
    } else if (recommendationProfile === 'alto-rendimiento') {
      recommendedScenario = [...scenarios].sort((a, b) => {
        if (b.installedPowerKw !== a.installedPowerKw) {
          return b.installedPowerKw - a.installedPowerKw
        }

        if (a.panelCount !== b.panelCount) {
          return a.panelCount - b.panelCount
        }

        return a.totalInvestment - b.totalInvestment
      })[0]
    }

    const selectedScenario =
      scenarios.find((scenario) => scenario.panel.id === selectedPanelId) ?? recommendedScenario
    const selectedProfile = recommendationProfiles.find((profile) => profile.id === recommendationProfile)

    return {
      requiredSystemKw,
      scenarios,
      recommendedScenario,
      selectedScenario,
      selectedProfile,
    }
  }, [monthlyConsumption, panelOptions, recommendationProfile, selectedPanelId, sunHours, tariff])

  const handleAddSuggestedPack = () => {
    if (!analysis?.recommendedScenario) {
      return
    }

    addItem(analysis.recommendedScenario.panel, analysis.recommendedScenario.panelCount)
    setAddedMessage('Se agrego al carrito la recomendacion del cotizador.')
  }

  const handleSaveQuote = () => {
    if (!analysis?.recommendedScenario) {
      return
    }

    const recommendedPanel = analysis.recommendedScenario.panel

    saveQuote({
      createdAt: new Date().toISOString(),
      profileId: analysis.selectedProfile?.id ?? 'economico',
      profileLabel: analysis.selectedProfile?.label ?? 'Economico',
      monthlyConsumption,
      sunHours,
      tariff,
      recommendedPanelId: recommendedPanel.id,
      recommendedPanelTitle: recommendedPanel.title,
      recommendedPanelPrice: recommendedPanel.price,
      recommendedPanelImage: recommendedPanel.image,
      recommendedPanelCategory: recommendedPanel.category,
      recommendedPanelStock: recommendedPanel.stock,
      recommendedPanelWatts: recommendedPanel.watts,
      recommendedPanelCount: analysis.recommendedScenario.panelCount,
      totalInvestment: analysis.recommendedScenario.totalInvestment,
    })

    setAddedMessage('Cotizacion guardada en tu perfil.')
  }

  return (
    <section>
      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <CalculateRoundedIcon />
        </Avatar>
        <Box>
          <Typography variant="h4">Cotizador Solar</Typography>
          <Typography color="text.secondary">
            Estimacion rapida de paneles, inversion y ahorro anual.
          </Typography>
        </Box>
      </Stack>

      {loadingPanels && (
        <Box sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {loadingError && <Alert severity="error">{loadingError}</Alert>}
      {addedMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setAddedMessage('')}>
          {addedMessage}
        </Alert>
      )}

      {!loadingPanels && panelOptions.length === 0 && !loadingError && (
        <Alert severity="warning">No hay paneles disponibles para cotizar en este momento.</Alert>
      )}

      {analysis && (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent sx={{ display: 'grid', gap: 1.4 }}>
              <TextField
                label="Consumo mensual (kWh)"
                type="number"
                value={monthlyConsumption}
                onChange={(event) => setMonthlyConsumption(Math.max(1, Number(event.target.value)))}
              />

              <TextField
                label="Horas sol pico promedio"
                type="number"
                inputProps={{ step: 0.1 }}
                value={sunHours}
                onChange={(event) => setSunHours(Math.max(1, Number(event.target.value)))}
              />

              <TextField
                select
                label="Tipo de panel"
                value={selectedPanel?.id ?? ''}
                onChange={(event) => setSelectedPanelId(event.target.value)}
              >
                {panelOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title} ({option.watts}W)
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Tarifa energia (COP/kWh)"
                type="number"
                value={tariff}
                onChange={(event) => setTariff(Math.max(100, Number(event.target.value)))}
              />

              <TextField
                select
                label="Perfil de recomendacion"
                value={recommendationProfile}
                onChange={(event) => setRecommendationProfile(event.target.value)}
              >
                {recommendationProfiles.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.label}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={1.5}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BoltRoundedIcon color="primary" />
                  <Typography variant="h6">Dimensionamiento recomendado</Typography>
                </Stack>
                <Typography sx={{ mt: 1 }}>
                  Potencia objetivo del sistema:{' '}
                  <strong>{analysis.requiredSystemKw.toFixed(2)} kW</strong>
                </Typography>
                <Typography>
                  Recomendado ({analysis.selectedProfile?.label}):{' '}
                  <strong>{analysis.recommendedScenario.panel.title}</strong>
                </Typography>
                <Typography>
                  Cantidad sugerida: <strong>{analysis.recommendedScenario.panelCount}</strong> panel(es)
                </Typography>
                <Typography>
                  Potencia instalada: <strong>{analysis.recommendedScenario.installedPowerKw.toFixed(2)} kW</strong>
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ mt: 0.8 }}>
                  {analysis.selectedProfile?.description}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inversion estimada (panel seleccionado)
                </Typography>
                <Typography>
                  Equipos: {formatCurrency(analysis.selectedScenario.equipmentCost)}
                </Typography>
                <Typography>
                  Instalacion (20%): {formatCurrency(analysis.selectedScenario.installationCost)}
                </Typography>
                <Typography sx={{ mt: 0.8, color: 'primary.main', fontWeight: 700 }}>
                  Total: {formatCurrency(analysis.selectedScenario.totalInvestment)}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SavingsRoundedIcon color="success" />
                  <Typography variant="h6">Ahorro proyectado</Typography>
                </Stack>
                <Typography sx={{ mt: 1 }}>
                  Ahorro mensual: {formatCurrency(analysis.selectedScenario.monthlySaving)}
                </Typography>
                <Typography>
                  Ahorro anual: {formatCurrency(analysis.selectedScenario.annualSaving)}
                </Typography>
                <Typography sx={{ mt: 0.8 }}>
                  Recuperacion estimada:{' '}
                  <strong>{analysis.selectedScenario.paybackYears.toFixed(1)} anos</strong>
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleAddSuggestedPack}>
                    Agregar recomendacion al carrito
                  </Button>
                  <Button variant="outlined" onClick={handleSaveQuote}>
                    Guardar cotizacion
                  </Button>
                  <Button
                    component={Link}
                    to={`/item/${analysis.recommendedScenario.panel.id}`}
                    variant="outlined"
                  >
                    Ver panel recomendado
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      )}
    </section>
  )
}

export default QuoteCalculator
