import { BrowserRouter } from 'react-router-dom'
import { Box, ThemeProvider, Typography, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProfilesList } from './components/ProfilesList'
import { SearchBox } from './components/SearchBox'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box component="main">
            <Typography component="h1" variant="h3" sx={{ my: 8, mx: 'auto' }}>
              GH profiles search
            </Typography>
            <SearchBox />
            <ProfilesList />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
