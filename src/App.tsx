import { BrowserRouter } from 'react-router-dom'
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProfilesList } from './components/ProfilesList'
import { SearchBox } from './components/SearchBox'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          overscrollBehavior: 'none',
        },
      },
    },
  },
})

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter basename="/gh-profiles-search">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            component="main"
            maxWidth="lg"
            sx={{ minHeight: '100vh', pb: 4 }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                bgcolor: 'background.default',
                pt: 6,
                pb: 2,
              }}
            >
              <Typography
                component="h1"
                sx={{
                  typography: { xs: 'h4', md: 'h3' },
                  mb: { xs: 4, md: 8 },
                  textAlign: 'center',
                }}
              >
                GH profiles&nbsp;search
              </Typography>
              <SearchBox />
            </Box>
            <ProfilesList />
          </Container>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
