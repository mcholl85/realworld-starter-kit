import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../services/contexts/UserContextProvider'
import useFollow from '../services/hooks/use-follow'
import useProfile from '../services/hooks/use-profile'

type ProfileInfosProps = {
  username: string
}

function ProfileInfos({ username }: ProfileInfosProps) {
  const { user } = useContext(UserContext)
  const { profile } = useProfile({ username })
  const { followUser, unFollowUser } = useFollow({ username })

  return (
    <div className='user-info'>
      <div className='container'>
        <div className='row'>
          {profile && (
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img src={profile.image} className='user-img' />
              <h4>{username}</h4>
              <p>{profile.bio}</p>
              {user.username === profile.username ? (
                <Link className='btn btn-sm btn-outline-secondary action-btn' to='/settings'>
                  <i className='ion-gear-a'></i> Edit Profile Settings
                </Link>
              ) : (
                <button
                  className='btn btn-sm btn-outline-secondary action-btn'
                  onClick={() => (profile.following ? unFollowUser() : followUser())}
                >
                  <i className='ion-plus-round'></i> {profile.following ? 'Unfollow' : 'Follow'}{' '}
                  {username}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfos
