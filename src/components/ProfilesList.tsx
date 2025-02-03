import { Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../queries'

type ProfilesListProps = {
  query: string
}

export const ProfilesList = ({ query }: ProfilesListProps) => {
  const profilesQuery = useQuery({
    ...queries.search.users(query),
    enabled: typeof query === 'string' && query.length > 0,
  })

  if (profilesQuery.isLoading) {
    return <div>Loading...</div>
  }

  // TODO: handle error
  // TODO: remember about infinite scroll

  return (
    // TODO: make it a list of cards
    <ul>
      {profilesQuery.data?.items.map((profile) => (
        <li key={profile.id}>
          <Typography>{profile.login}</Typography>
        </li>
      ))}
    </ul>
  )
}
