import { useQuery } from '@tanstack/react-query'
import { QUERY_COMMENTS_KEY } from '../constants/query.constants'
import { getComments } from '../services/api/articles'
import CommentForm from './CommentForm'
import Comment from './Comment'

type ArticleCommentsProps = {
  slug: string
}

function ArticleComments({ slug }: ArticleCommentsProps) {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_COMMENTS_KEY, slug],
    queryFn: async () => await getComments(slug),
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div></div>

  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <CommentForm slug={slug} />
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} slug={slug} />
        ))}
      </div>
    </div>
  )
}

export default ArticleComments
