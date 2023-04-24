import classNames from 'classnames'
import { Link } from 'react-router-dom'
import useFavorite from '../services/hooks/use-favorite'
import { format } from 'date-fns'

type ArticlePreviewProps = {
  slug: string
  title: string
  description: string
  updateAt: string
  favorited: boolean
  favoritesCount: number
  tagList: string[]
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

function ArticlePreview({
  slug,
  title,
  description,
  tagList,
  author,
  updateAt,
  favorited,
  favoritesCount,
}: ArticlePreviewProps) {
  const { likeArticle, unlikeArticle } = useFavorite()
  const handleClickButton = () => (favorited ? unlikeArticle(slug) : likeArticle(slug))

  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/${author.username}/`}>
          <img src={author.image} />
        </Link>
        <div className='info'>
          <Link to={`/user/${author.username}/`} className='author'>
            {author.username}
          </Link>
          <span className='date'>{format(new Date(updateAt), 'MMMM d, yyyy')}</span>
        </div>
        <button
          onClick={handleClickButton}
          className={`btn ${classNames({
            'btn-primary': favorited,
            'btn-outline-primary': !favorited,
          })} btn-sm pull-xs-right`}
        >
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {tagList.map((tag) => (
            <li key={tag} className='tag-default tag-pill tag-outline ng-binding ng-scope'>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
