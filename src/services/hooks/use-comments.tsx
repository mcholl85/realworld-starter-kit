import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment, postComment } from '../api/articles'
import { QUERY_COMMENTS_KEY } from '../../constants/query.constants'

type UseCommentsProps = {
  slug: string
}

function useComments({ slug }: UseCommentsProps) {
  const queryClient = useQueryClient()

  const { mutate: addComment } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_COMMENTS_KEY, slug])
    },
  })

  const { mutate: removeComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_COMMENTS_KEY, slug])
    },
  })

  return { addComment, removeComment }
}

export default useComments
