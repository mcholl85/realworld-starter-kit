import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/profiles'
import { useNavigate } from 'react-router-dom'
import { QUERY_PROFILE_KEY } from '../../constants/query.constants'

type UseProfileProps = {
  username: string
}

function useProfile({ username }: UseProfileProps) {
  const navigate = useNavigate()
  const profileQuery = useQuery({
    queryKey: [QUERY_PROFILE_KEY, username],
    queryFn: async () => await getProfile(username),
    retry: 0,
    onError: () => navigate('/'),
  })

  return { profile: profileQuery.data, isError: profileQuery.isError }
}

export default useProfile
