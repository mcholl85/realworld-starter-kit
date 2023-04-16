import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFollowUser, postFollowUser } from '../api/profiles'

type useFollowProps = {
  username: string
}

function useFollow({ username }: useFollowProps) {
  const queryClient = useQueryClient()

  const { mutate: followUser } = useMutation({
    mutationFn: async () => await postFollowUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const { mutate: unFollowUser } = useMutation({
    mutationFn: async () => await deleteFollowUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return { followUser, unFollowUser }
}

export default useFollow
