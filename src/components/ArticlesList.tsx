import { IArticle } from '../interfaces'
import ArticlePreview from './ArticlePreview'

type ArticlesListProps = {
  articles?: IArticle[]
  articlesCount?: number
  isError: boolean
  isLoading: boolean
}

function ArticlesList({ articles, articlesCount, isError, isLoading }: ArticlesListProps) {
  if (isLoading) return <div className='article-preview'>Loading articles...</div>
  if (isError) return <div className='article-preview'>Something wrong append</div>
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
