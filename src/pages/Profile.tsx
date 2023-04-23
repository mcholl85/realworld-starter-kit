import classNames from 'classnames'
import { NavLink, useParams } from 'react-router-dom'
import ArticlesList from '../components/ArticlesList'
import ProfileInfos from '../components/ProfileInfos'

type ProfileProps = {
  isFavorite: boolean
}

function Profile({ isFavorite }: ProfileProps) {
  const { username } = useParams() as Record<'username', string>

  return (
    <div className='profile-page'>
      <ProfileInfos username={username} />
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <NavLink className={classNames('nav-link')} to={`/user/${username}/`}>
                    My Articles
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className={classNames('nav-link')} to={`/user/${username}/favorites`}>
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            <ArticlesList isFavorite={isFavorite} username={username} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
