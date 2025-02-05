import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField } from '@mui/material'

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
    watch,
  } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      username: initialUsername,
    },
  })

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    ({ username }) => {
      setSearchParams({ username: encodeURIComponent(username ?? '') })
    },
    [setSearchParams]
  )

  const usernameWatch = watch('username')

  // triggger search 2s after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit(onSubmit)()
    }, 2000)

    return () => clearTimeout(timer)
  }, [usernameWatch, handleSubmit, onSubmit])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
