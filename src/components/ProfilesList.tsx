import InfiniteScroll from 'react-infinite-scroller'
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ghSearchUsersQuery } from '../queries'
import { withQueryValue } from '../utils/withQueryValue'
import { ProfilesListSkeleton } from './ProfilesListSkeleton'

type ProfilesListBaseProps = {
  query: string
}

const ProfilesListBase = ({ query }: ProfilesListBaseProps) => {
  const profilesRequest = useInfiniteQuery({
    ...ghSearchUsersQuery(query),
    enabled: query.length > 0,
  })

  if (query.length === 0) {
    return null
  }

  if (profilesRequest.isLoading) {
    return <ProfilesListSkeleton itemsCount={12} />
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
      loader={
        <Box key={0} pt={2}>
          <ProfilesListSkeleton itemsCount={8} />
        </Box>
      }
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

export const ProfilesList = withQueryValue(ProfilesListBase)
