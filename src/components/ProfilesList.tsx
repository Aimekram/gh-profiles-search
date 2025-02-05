import InfiniteScroll from 'react-infinite-scroller'
import { useSearchParams } from 'react-router-dom'
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ghSearchUsersQuery } from '../queries'
import { USERNAME_QUERY_KEY } from './SearchBox'

export const ProfilesList = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get(USERNAME_QUERY_KEY) ?? ''

  const profilesRequest = useInfiniteQuery({
    ...ghSearchUsersQuery(query),
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

  const profiles =
    profilesRequest.data?.pages.flatMap((page) => page.items) ?? []

  if (profiles.length === 0) {
    return (
      <Alert severity="info">
        No matching profiles found, try different username
      </Alert>
    )
  }

  return (
    <InfiniteScroll
      loadMore={() => profilesRequest.fetchNextPage()}
      hasMore={profilesRequest.hasNextPage}
      loader={<div key={0}>Loading more...</div>}
    >
      <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {profiles.map((profile) => (
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
    </InfiniteScroll>
  )
}
