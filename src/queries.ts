import * as yup from 'yup'
import { QueryFunctionContext } from '@tanstack/react-query'

const GH_API_URL = 'https://api.github.com'
const INITIAL_PAGE = 1
const PER_PAGE = 12

type GithubSearchResponse = yup.InferType<typeof githubSearchResponseSchema>

export const ghSearchUsersQuery = (query: string) => ({
  queryKey: ['search', 'users', query],
  queryFn: async ({ pageParam }: QueryFunctionContext) => {
    const response = await fetch(
      `${GH_API_URL}/search/users?q=${query}&page=${pageParam}&per_page=${PER_PAGE}`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
    const data = await response.json()
    return githubSearchResponseSchema.validateSync(data)
  },
  getNextPageParam: (
    lastPage: GithubSearchResponse,
    allPages: GithubSearchResponse[]
  ) => {
    const nextPage = allPages.length + 1
    const totalPages = Math.ceil(lastPage.total_count / PER_PAGE)
    return nextPage <= totalPages ? nextPage : undefined
  },
  initialPageParam: INITIAL_PAGE,
})

// schemas
const githubUserSchema = yup.object({
  login: yup.string().required(),
  id: yup.number().required(),
  avatar_url: yup.string().url().required(),
  html_url: yup.string().url().required(),
  type: yup.string().required(),
  score: yup.number().required(),
  name: yup.string().nullable(),
  bio: yup.string().nullable(),
  location: yup.string().nullable(),
  blog: yup.string().url().nullable(),
  company: yup.string().nullable(),
  email: yup.string().email().nullable(),
})

const githubSearchResponseSchema = yup.object({
  total_count: yup.number().required(),
  incomplete_results: yup.boolean().required(),
  items: yup.array().of(githubUserSchema).required(),
})
