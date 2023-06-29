import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFollowUser, postFollowUser } from '../api/profiles'
import { QUERY_ARTICLE_KEY, QUERY_PROFILE_KEY } from '../../constants/query.constants'

type UseFollowProps = {
  username: string
}

function useFollow({ username }: UseFollowProps) {
  const queryClient = useQueryClient()

  const { mutate: followUser } = useMutation({
    mutationFn: async () => await postFollowUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLE_KEY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_PROFILE_KEY] })
    },
  })

  const { mutate: unFollowUser } = useMutation({
    mutationFn: async () => await deleteFollowUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ARTICLE_KEY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_PROFILE_KEY] })
    },
  })

  return { followUser, unFollowUser }
}

export default useFollow
