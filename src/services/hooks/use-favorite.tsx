import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFavorite, postFavorite } from '../api/articles'

function useFavorite() {
  const queryClient = useQueryClient()
  const { mutate: likeArticle } = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
      queryClient.invalidateQueries(['article'])
    },
  })
  const { mutate: unlikeArticle } = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(['articles'])
      queryClient.invalidateQueries(['article'])
    },
  })

  return { likeArticle, unlikeArticle }
}
export default useFavorite
