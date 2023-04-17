import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteComment, getComments, postComment } from '../api/articles'
import { QUERY_COMMENTS_KEY } from '../../constants/query.constants'

type UseCommentsProps = {
  slug: string
}

function useComments({ slug }: UseCommentsProps) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_COMMENTS_KEY, slug],
    queryFn: async () => await getComments(slug),
  })

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

  return { comments: data, isLoading, addComment, removeComment }
}

export default useComments
