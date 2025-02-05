import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { Box, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

export const USERNAME_QUERY_KEY = 'username'

const searchSchema = yup.object({
  username: yup.string().matches(
    /(^$|^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$)/i, // allow empty to clear the search
    'Username must contain only letters, numbers, and hyphens (no consecutive hyphens), up to 39 chars'
  ),
})

type SearchFormValues = yup.InferType<typeof searchSchema>

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialUsername = searchParams.get(USERNAME_QUERY_KEY) ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      username: initialUsername,
    },
  })

  const onSearchSubmit: SubmitHandler<SearchFormValues> = ({ username }) => {
    const encodedUsername = encodeURIComponent(username ?? '')
    setSearchParams({ username: encodedUsername })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSearchSubmit)}>
      <TextField
        autoFocus
        fullWidth
        type="text"
        label="Search by username"
        {...register('username')}
        error={Boolean(errors?.username)}
        helperText={errors?.username?.message}
      />
    </Box>
  )
}
