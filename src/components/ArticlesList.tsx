import { Article } from '../services/hooks/use-article'
import ArticlePreview from './ArticlePreview'

type ArticlesListProps = {
  articles?: Article[]
  articlesCount?: number
  isLoading: boolean
  isSuccess: boolean
}

function ArticlesList({ articles, articlesCount, isLoading }: ArticlesListProps) {
  if (isLoading) return <div className='article-preview'>Loading articles...</div>
  if (articlesCount === 0)
    return <div className='article-preview'>No articles are here... yet.</div>

  return (
    <>
      {articles?.map((article) => (
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
