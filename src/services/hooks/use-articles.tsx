import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../api/articles'
import { useEffect, useState } from 'react'
import { DEFAULT_LIMIT } from '../api/constants'

type UseArticlesProps = {
  favorited?: string
  author?: string
  isLogged?: boolean
}
function useArticles({ favorited, author, isLogged }: UseArticlesProps) {
  const [selectedTag, setSelectedTag] = useState('')
  const [isFeed, setIsFeed] = useState(isLogged)
  const [isGlobal, setIsGlobal] = useState(!isLogged)
  const [isTag, setIsTag] = useState(false)

  const [page, setPage] = useState(1)
  const offset = (page - 1) * DEFAULT_LIMIT

  const articlesQuery = useQuery({
    queryKey: ['articles', { feed: isFeed, tag: selectedTag, author, favorited, offset }],
    queryFn: async () =>
      await getArticles({
        feed: isFeed,
        tag: selectedTag,
        author,
        favorited,
        offset,
      }),
  })

  const totalPage = articlesQuery.data
    ? Math.ceil(articlesQuery.data.articlesCount / DEFAULT_LIMIT)
    : 0

  useEffect(() => {
    if (selectedTag) {
      setIsFeed(false)
      setIsGlobal(false)
      setIsTag(true)
      setPage(1)
    }
  }, [selectedTag])

  return {
    articles: articlesQuery?.data?.articles,
    isLoading: articlesQuery?.isLoading,
    isSuccess: articlesQuery?.isSuccess,
    articlesCount: articlesQuery?.data?.articlesCount,
    isFeed,
    setIsFeed,
    isGlobal,
    setIsGlobal,
    isTag,
    setIsTag,
    selectedTag,
    setSelectedTag,
    page,
    setPage,
    totalPage,
  }
}

export default useArticles
