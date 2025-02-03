import { SubmitHandler, useFormContext } from 'react-hook-form'
import { Box, TextField } from '@mui/material'
import { SearchFormValues } from '../App'

type SearchBoxProps = {
  onSubmit: SubmitHandler<SearchFormValues>
}

export const SearchBox = ({ onSubmit }: SearchBoxProps) => {
  const { register, handleSubmit } = useFormContext<SearchFormValues>()

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        type="text"
        label="Search by username"
        {...register('username')}
      />
    </Box>
  )
}
