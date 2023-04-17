import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/profiles'
import { useNavigate } from 'react-router-dom'

type UseProfileProps = {
  username: string
}

export type Profile = {
  username: string
  bio: string
  image: string
  following: boolean
}

function useProfile({ username }: UseProfileProps) {
  const navigate = useNavigate()
  const profileQuery = useQuery({
    queryKey: ['profile', username],
    queryFn: async () => await getProfile(username),
    retry: 0,
    onError: () => navigate('/'),
  })

  return { profile: profileQuery.data, isError: profileQuery.isError }
}

export default useProfile
