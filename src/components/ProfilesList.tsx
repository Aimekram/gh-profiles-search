import InfiniteScroll from 'react-infinite-scroller'
import { useSearchParams } from 'react-router-dom'
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Skeleton,
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
    return <SkeletonCards cardsCount={12} />
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
      loader={<SkeletonCards />}
    >
      <List
        disablePadding
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {profiles.map((profile) => (
          <ListItem key={profile.id} disablePadding>
            <Card sx={{ width: '100%' }}>
              <CardActionArea
                component="a"
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${profile.login}'s GitHub profile`}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={profile.avatar_url}
                  aria-label={`${profile.login}'s GitHub avatar`}
                  role="img"
                />
                <CardContent>
                  <Typography variant="h6">{profile.login}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const SkeletonCards = ({ cardsCount = 4 }) => (
  <List
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      },
      gap: 2,
    }}
  >
    {Array.from(new Array(cardsCount)).map((_, index) => (
      <ListItem key={index} disablePadding>
        <Card sx={{ width: '100%' }}>
          <Skeleton variant="rectangular" sx={{ height: 140 }} />
          <CardContent>
            <Skeleton
              variant="text"
              sx={{ fontSize: '1.25rem', width: '60%' }}
            />
          </CardContent>
        </Card>
      </ListItem>
    ))}
  </List>
)
