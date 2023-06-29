import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../services/contexts/UserContextProvider'
import useFollow from '../services/hooks/use-follow'
import { QUERY_PROFILE_KEY } from '../constants/query.constants'
import { getProfile } from '../services/api/profiles'
import { useQuery } from '@tanstack/react-query'

type ProfileInfosProps = {
  username: string
}

function ProfileInfos({ username }: ProfileInfosProps) {
  const { user } = useContext(UserContext)
  const { followUser, unFollowUser } = useFollow({ username })
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_PROFILE_KEY, username],
    queryFn: async () => await getProfile(username),
    retry: 0,
  })

  if (isLoading) return <div className='user-info'>Loading...</div>
  if (isError) return <Navigate to='/' />

  return (
    <div className='user-info'>
      <div className='container'>
        <div className='row'>
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
        </div>
      </div>
    </div>
  )
}

export default ProfileInfos
