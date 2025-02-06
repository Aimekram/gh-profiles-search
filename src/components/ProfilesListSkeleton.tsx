import { Card, CardContent, List, ListItem, Skeleton } from '@mui/material'

type ProfilesListSkeletonProps = {
  itemsCount: number
}

export const ProfilesListSkeleton = ({
  itemsCount,
}: ProfilesListSkeletonProps) => (
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
    {Array.from(new Array(itemsCount)).map((_, index) => (
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
