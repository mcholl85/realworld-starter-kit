import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseErrors } from '../../utils/parseErrors'
import { postArticle, getArticle, putArticle, deleteArticle } from '../api/articles'
import { articleResponse } from '../api/articles/index.type'

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  tagList: Array<string>
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

type UseArticleProps = {
  fetched: boolean
  slug?: string
}

function useArticle({ fetched, slug }: UseArticleProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const defaultArticle: Article = {
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
    queryKey: ['article', slug],
    queryFn: async () => await getArticle(slug),
    retry: 0,
    enabled: fetched,
  })
  const [errors, setErrors] = useState<string[]>([])

  const { mutate: createArticle, isError: isCreateArticleError } = useMutation({
    mutationFn: postArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['article', data.slug])
      queryClient.invalidateQueries(['articles'])
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
      queryClient.invalidateQueries(['article'])
      queryClient.invalidateQueries(['articles'])
      navigate(`/article/${data.slug}`)
    },
  })

  const { mutate: removeArticle } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(['article'])
      queryClient.invalidateQueries(['articles'])
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
