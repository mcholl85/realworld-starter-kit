import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postArticle, getArticle, putArticle, deleteArticle } from '../api/articles'
import { articleResponse } from '../api/articles/index.types'
import { QUERY_ARTICLES_KEY, QUERY_ARTICLE_KEY } from '../../constants/query.constants'
import { IArticle } from '../../interfaces'

type UseArticleProps = {
  fetched: boolean
  slug?: string
}

function useArticle({ fetched, slug }: UseArticleProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const defaultArticle: IArticle = {
    slug: '',
    title: '',
    description: '',
    body: '',
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    tagList: [] as Array<string>,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  }
  const { data: article } = useQuery({
    queryKey: [QUERY_ARTICLE_KEY, slug],
    queryFn: async () => await getArticle(slug),
    retry: 0,
    enabled: fetched,
  })
  const [errors, setErrors] = useState<string[]>([])

  const { mutate: createArticle, isError: isCreateArticleError } = useMutation({
    mutationFn: postArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_ARTICLE_KEY, data.slug])
      queryClient.invalidateQueries([QUERY_ARTICLES_KEY])
      navigate(`/article/${data.slug}`)
    },
    onError: (error: AxiosError<articleResponse>) => {
      const data = error.response?.data
      if (data?.errors) setErrors(parseErrors(data.errors))
    },
  })

  const { mutate: updateArticle } = useMutation({
    mutationFn: putArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_ARTICLE_KEY])
      queryClient.invalidateQueries([QUERY_ARTICLES_KEY])
      navigate(`/article/${data.slug}`)
    },
  })

  const { mutate: removeArticle } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_ARTICLE_KEY])
      queryClient.invalidateQueries([QUERY_ARTICLES_KEY])
      navigate('/')
    },
  })

  return {
    article,
    defaultArticle,
    errors,
    isCreateArticleError,
    createArticle,
    updateArticle,
    removeArticle,
  }
}

export default useArticle
