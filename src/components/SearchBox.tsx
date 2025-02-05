import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Stack, TextField } from '@mui/material'

export const USERNAME_QUERY_KEY = 'username'

const searchSchema = yup.object({
  username: yup.string().matches(
    /(^$|^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$)/i, // allow empty to clear the search
    'GH usernames contain only letters, numbers, and hyphens (no consecutive hyphens), up to 39 chars'
  ),
})

type SearchFormValues = yup.InferType<typeof searchSchema>

export const SearchBox = () => {
  const [showSearchBtnAnimation, setShowSearchBtnAnimation] = useState(false)
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
    mode: 'onChange',
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
    if (usernameWatch === initialUsername) {
      return
    }

    setShowSearchBtnAnimation(true)

    const timer = setTimeout(() => {
      handleSubmit(onSubmit)()
      setShowSearchBtnAnimation(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [usernameWatch, handleSubmit, onSubmit, initialUsername])

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      spacing={1}
    >
      <TextField
        autoFocus
        fullWidth
        type="text"
        label="Search by username"
        {...register('username')}
        error={Boolean(errors?.username)}
        helperText={errors?.username?.message}
        slotProps={{ htmlInput: { 'data-testid': 'username-input' } }}
      />
      <Button
        type="submit"
        disabled={Boolean(errors?.username)}
        variant="contained"
        sx={(theme) => ({
          minWidth: 120,
          px: 2,
          backgroundColor: theme.palette.primary.main,
          background: showSearchBtnAnimation
            ? `linear-gradient(-90deg,
            ${theme.palette.primary.main} 0%,
            ${theme.palette.primary.main} 50%,
            ${theme.palette.secondary.main} 50%,
            ${theme.palette.secondary.main} 100%
          )`
            : 'primary.main',
          backgroundSize: '200% 100%',
          animation: showSearchBtnAnimation
            ? 'searchProgress 2s linear forwards'
            : 'none',
          '@keyframes searchProgress': {
            '0%': {
              backgroundPosition: '100% 0%',
            },
            '100%': {
              backgroundPosition: '0% 0%',
            },
          },
        })}
      >
        <SearchIcon />
      </Button>
    </Stack>
  )
}
