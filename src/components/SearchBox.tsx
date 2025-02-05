import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { Box, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'

export const USERNAME_QUERY_KEY = 'username'

const searchSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 character'),
})

type SearchFormValues = yup.InferType<typeof searchSchema>

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialUsername = searchParams.get(USERNAME_QUERY_KEY) ?? ''

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      username: initialUsername,
    },
  })

  const onSearchSubmit: SubmitHandler<SearchFormValues> = ({ username }) => {
    setSearchParams({ username })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSearchSubmit)}>
      <TextField
        autoFocus
        type="text"
        label="Search by username"
        {...register('username')}
      />
    </Box>
  )
}
