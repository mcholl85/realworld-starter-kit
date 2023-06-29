import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment, postComment } from '../api/articles'
import { QUERY_COMMENTS_KEY } from '../../constants/query.constants'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { IErrors } from '../../interfaces'
import { parseErrors } from '../../utils/parseErrors'

type UseCommentsProps = {
  slug: string
}

function useComments({ slug }: UseCommentsProps) {
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<string[]>([])

  const { mutate: addComment, isError: addCommentIsError } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_COMMENTS_KEY, slug])
    },
    onError: (error: AxiosError<Record<'errors', IErrors>>) => {
      const data = error.response?.data
      if (data?.errors) setErrors(parseErrors(data.errors))
    },
  })

  const { mutate: removeComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_COMMENTS_KEY, slug])
    },
  })

  return { addComment, removeComment, addCommentIsError, errors }
}

export default useComments
