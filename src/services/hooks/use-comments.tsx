import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteComment, getComments, postComment } from '../api/comments'

type useCommentsProps = {
  slug: string
}

function useComments({ slug }: useCommentsProps) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['comments', slug],
    queryFn: async () => await getComments(slug),
  })

  const { mutate: addComment } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', slug])
    },
  })

  const { mutate: removeComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', slug])
    },
  })

  return { comments: data, isLoading, addComment, removeComment }
}

export default useComments
