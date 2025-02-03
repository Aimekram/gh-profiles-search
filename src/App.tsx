import { ThemeProvider, Typography, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h1">Vite + React</Typography>
    </ThemeProvider>
  )
}

export default App
