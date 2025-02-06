// this is a HOC that provides query value to a component its wrapped around
// HOCs are using composition, which is one of functional programming principles

import { useSearchParams } from 'react-router-dom'

const USERNAME_QUERY_KEY = 'username'

type WithQueryValueProps = {
  query: string
}

export const withQueryValue = <P extends object>(
  Component: React.ComponentType<P & WithQueryValueProps>
) => {
  return (props: P) => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get(USERNAME_QUERY_KEY) ?? ''

    return <Component {...props} query={query} />
  }
}
