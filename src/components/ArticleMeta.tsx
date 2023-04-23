import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import classNames from 'classnames'
import useFollow from '../services/hooks/use-follow'
import useFavorite from '../services/hooks/use-favorite'
import { useContext } from 'react'
import { UserContext } from '../services/contexts/UserContextProvider'
import useArticle from '../services/hooks/use-article'

type ArticleMetaProps = {
  username: string
  image: string
  following: boolean
  favorited: boolean
  updateAt: Date
  slug: string
  favoritesCount: number
}

function ArticleMeta({
  username,
  image,
  following,
  favorited,
  updateAt,
  slug,
  favoritesCount,
}: ArticleMetaProps) {
  const { user } = useContext(UserContext)
  const { followUser, unFollowUser } = useFollow({ username })
  const { likeArticle, unlikeArticle } = useFavorite()
  const { removeArticle } = useArticle({ fetched: false })

  return (
    <div className='article-meta'>
      <Link to={`/user/${username}`}>
        <img src={image} />
      </Link>
      <div className='info'>
        <Link to={`/user/${username}`} className='author'>
          {username}
        </Link>
        <span className='date'>{format(new Date(updateAt), 'MMMM d, yyyy')}</span>
      </div>
      {user.username === username ? (
        <span>
          <Link className='btn btn-outline-secondary btn-sm' to={`/editor/${slug}`}>
            <i className='ion-edit'></i> Edit Article
          </Link>
          <button className='btn btn-outline-danger btn-sm' onClick={() => removeArticle(slug)}>
            <i className='ion-trash-a'></i> Delete Article
          </button>
        </span>
      ) : (
        <>
          <button
            className={classNames('btn btn-sm', {
              'btn-outline-secondary': !following,
              'btn-secondary': following,
            })}
            onClick={() => (following ? unFollowUser() : followUser())}
          >
            <i className='ion-plus-round'></i>
            &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
          </button>
          &nbsp;&nbsp;
          <button
            className={classNames('btn btn-sm', {
              'btn-outline-primary': !favorited,
              'btn-primary': favorited,
            })}
            onClick={() => (favorited ? unlikeArticle(slug) : likeArticle(slug))}
          >
            <i className='ion-heart'></i>
            &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Post{' '}
            <span className='counter'>({favoritesCount})</span>
          </button>
        </>
      )}
    </div>
  )
}

export default ArticleMeta
