import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { queries } from '../queries'

type ProfilesListProps = {
  query: string
}

export const ProfilesList = ({ query }: ProfilesListProps) => {
  const profilesRequest = useQuery({
    ...queries.search.users(query),
    enabled: typeof query === 'string' && query.length > 0,
  })

  if (profilesRequest.isLoading) {
    return <div>Loading...</div>
  }

  if (profilesRequest.isError) {
    return (
      <Alert severity="error">
        Couldn't get profiles list, please refresh and try again
      </Alert>
    )
  }

  // TODO: remember about infinite scroll
  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {profilesRequest.data?.items.map((profile) => (
        <ListItem key={profile.id} sx={{ flexBasis: 250 }}>
          <Card sx={{ width: '100%' }}>
            <CardMedia
              sx={{ height: 140 }}
              image={profile.avatar_url}
              title={profile.login}
            />
            <CardContent>
              <Typography variant="h6">{profile.login}</Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  )
}
