import * as yup from 'yup'

const GH_API_URL = 'https://api.github.com'

export const ghSearchUsersQuery = (query: string) => ({
  queryKey: ['search', 'users', query],
  queryFn: async () => {
    const response = await fetch(`${GH_API_URL}/search/users?q=${query}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    const data = await response.json()

    return githubSearchResponseSchema.validateSync(data)
  },
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
