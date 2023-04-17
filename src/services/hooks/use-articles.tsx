import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles'
import { useState } from 'react'
import { DEFAULT_LIMIT } from '../../constants/api.constants'

type UseArticlesProps = {
  favorited?: string
  author?: string
  isFeed?: boolean
  tag?: string
}
function useArticles({ favorited, author, isFeed, tag }: UseArticlesProps) {
  const [page, setPage] = useState(1)
  const offset = (page - 1) * DEFAULT_LIMIT

  const articlesQuery = useQuery({
    queryKey: ['articles', { feed: isFeed, tag, author, favorited, offset }],
    queryFn: async () =>
      await getArticles({
        feed: isFeed,
        tag,
        author,
        favorited,
        offset,
      }),
    retry: 0,
  })

  const totalPage = articlesQuery.data?.articlesCount
    ? Math.ceil(articlesQuery.data.articlesCount / DEFAULT_LIMIT)
    : 0

  return {
    articles: articlesQuery?.data?.articles,
    isLoading: articlesQuery?.isLoading,
    isSuccess: articlesQuery?.isSuccess,
    articlesCount: articlesQuery?.data?.articlesCount,
    page,
    setPage,
    totalPage,
  }
}

export default useArticles
