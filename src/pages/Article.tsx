import { useParams } from 'react-router-dom'
import useArticle from '../services/hooks/use-article'
import ArticleMeta from '../components/ArticleMeta'
import ArticleComments from '../components/ArticleComments'

function Article() {
  const { slug } = useParams() as Record<'slug', string>
  const { article } = useArticle({ slug: slug, fetched: true })

  return (
    <div className='article-page'>
      {article && (
        <>
          <div className='banner'>
            <div className='container'>
              <h1>{article.title}</h1>

              <ArticleMeta
                username={article.author.username}
                image={article.author.image}
                following={article.author.following}
                favorited={article.favorited}
                updateAt={article.updatedAt}
                slug={article.slug}
                favoritesCount={article.favoritesCount}
              />
            </div>
          </div>

          <div className='container page'>
            <div className='row article-content'>
              <div className='col-md-12'>
                <p>{article.description}</p>
                <p>{article.body}</p>
              </div>
              <ul className='tag-list'>
                {article.tagList.map((tag) => (
                  <li key={tag} className='tag-default tag-pill tag-outline ng-binding ng-scope'>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            <div className='article-actions'>
              <ArticleMeta
                username={article.author.username}
                image={article.author.image}
                following={article.author.following}
                favorited={article.favorited}
                updateAt={article.updatedAt}
                slug={article.slug}
                favoritesCount={article.favoritesCount}
              />
            </div>

            <ArticleComments slug={slug} />
          </div>
        </>
      )}
    </div>
  )
}

export default Article
