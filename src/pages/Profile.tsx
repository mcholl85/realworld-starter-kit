import classNames from 'classnames'
import { NavLink, useParams } from 'react-router-dom'
import ArticlesList from '../components/ArticlesList'
import ProfileInfos from '../components/ProfileInfos'
import useArticles from '../services/hooks/use-articles'
import Pagination from '../components/Pagination'

type ProfileProps = {
  isFavorite: boolean
}

function Profile({ isFavorite }: ProfileProps) {
  const { username } = useParams() as Record<'username', string>
  const { articles, isLoading, isError, articlesCount, totalPage, page, setPage } = useArticles({
    favorited: isFavorite ? username : undefined,
    author: !isFavorite ? username : undefined,
  })

  return (
    <div className='profile-page'>
      <ProfileInfos username={username} />
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <NavLink className={classNames('nav-link')} to={`/${username}/`}>
                    My Articles
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className={classNames('nav-link')} to={`/${username}/favorites`}>
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            <ArticlesList
              articles={articles}
              articlesCount={articlesCount}
              isLoading={isLoading}
              isError={isError}
            />
            <Pagination totalPage={totalPage} currentPage={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
