import { useQuery } from '@tanstack/react-query'
import ArticlePreview from './ArticlePreview'
import { getArticles } from '../services/api/articles'
import { DEFAULT_LIMIT } from '../constants/api.constants'
import { useEffect } from 'react'

type ArticlesListProps = {
  isFavorite?: boolean
  username?: string
  isFeed?: boolean
  tag?: string
  page: number
  setTotalPage: (page: number) => void
}

function ArticlesList({
  isFavorite,
  username,
  isFeed,
  tag,
  page,
  setTotalPage,
}: ArticlesListProps) {
  const offset = (page - 1) * DEFAULT_LIMIT
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', { feed: isFeed, tag, username, isFavorite, offset }],
    queryFn: async () =>
      await getArticles({
        feed: isFeed,
        tag,
        username,
        isFavorite,
        offset,
      }),
    retry: 0,
  })
  useEffect(() => {
    const totalPage = data?.articlesCount ? Math.ceil(data.articlesCount / DEFAULT_LIMIT) : page
    setTotalPage(totalPage)
  }, [data?.articlesCount])

  if (isLoading) return <div className='article-preview'>Loading articles...</div>
  if (isError) return <div className='article-preview'>Something wrong append</div>
  if (data.articlesCount === 0)
    return <div className='article-preview'>No articles are here... yet.</div>

  return (
    <>
      {data.articles?.map((article) => (
        <ArticlePreview
          key={article.slug}
          slug={article.slug}
          tagList={article.tagList}
          title={article.title}
          description={article.description}
          updateAt={article.updatedAt}
          favorited={article?.favorited}
          favoritesCount={article?.favoritesCount}
          author={article?.author}
        />
      ))}
    </>
  )
}

export default ArticlesList
