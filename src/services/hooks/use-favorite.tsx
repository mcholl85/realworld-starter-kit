import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFavorite, postFavorite } from '../api/articles'
import { QUERY_ARTICLES_KEY, QUERY_ARTICLE_KEY } from '../../constants/query.constants'

function useFavorite() {
  const queryClient = useQueryClient()
  const { mutate: likeArticle } = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_ARTICLES_KEY])
      queryClient.invalidateQueries([QUERY_ARTICLE_KEY])
    },
  })
  const { mutate: unlikeArticle } = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_ARTICLES_KEY])
      queryClient.invalidateQueries([QUERY_ARTICLE_KEY])
    },
  })

  return { likeArticle, unlikeArticle }
}
export default useFavorite
