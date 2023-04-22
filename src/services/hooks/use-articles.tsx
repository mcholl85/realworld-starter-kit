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

  const { data, isLoading, isSuccess, isError } = useQuery({
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

  const totalPage = data?.articlesCount ? Math.ceil(data.articlesCount / DEFAULT_LIMIT) : page

  return {
    articles: data?.articles,
    isLoading,
    isSuccess,
    isError,
    articlesCount: data?.articlesCount,
    page,
    setPage,
    totalPage,
  }
}

export default useArticles
