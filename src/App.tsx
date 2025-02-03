import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, ThemeProvider, Typography, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { SearchBox } from './components/SearchBox'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProfilesList } from './components/ProfilesList'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const queryClient = new QueryClient()

const searchSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 character'),
})

export type SearchFormValues = yup.InferType<typeof searchSchema>

const App = () => {
  const methods = useForm<SearchFormValues>({
    resolver: yupResolver(searchSchema),
  })

  const username = methods.watch('username')

  const onSearchSubmit = () => {
    console.log('Search submitted')
    console.log(methods.getValues('username'))
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="main">
          <Typography component="h1" variant="h3" sx={{ my: 8, mx: 'auto' }}>
            GH profiles search
          </Typography>
          <FormProvider {...methods}>
            <SearchBox onSubmit={onSearchSubmit} />
            <Typography>username from methods: {username}</Typography>
          </FormProvider>
          <ProfilesList query={username} />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
