import { useForm } from 'react-hook-form'
import useComments from '../services/hooks/use-comments'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../services/contexts/UserContextProvider'

type ArticleCommentsProps = {
  slug: string
}

function ArticleComments({ slug }: ArticleCommentsProps) {
  const {
    user: { username, image },
  } = useContext(UserContext)
  const { comments, addComment, removeComment } = useComments({ slug })
  const { register, handleSubmit, reset } = useForm<Record<'body', string>>()

  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <form
          className='card comment-form'
          onSubmit={handleSubmit((data) => {
            addComment({ form: data, slug })
            reset()
          })}
        >
          <div className='card-block'>
            <textarea
              className='form-control'
              placeholder='Write a comment...'
              rows={3}
              {...register('body')}
            ></textarea>
          </div>
          <div className='card-footer'>
            <img src={image} className='comment-author-img' />
            <button className='btn btn-sm btn-primary'>Post Comment</button>
          </div>
        </form>

        {comments &&
          comments?.map((comment) => (
            <div key={comment.id} className='card'>
              <div className='card-block'>
                <p className='card-text'>{comment.body}</p>
              </div>
              <div className='card-footer'>
                <Link to={`/author/${comment.author}`} className='comment-author'>
                  <img src={comment.author.image} className='comment-author-img' />
                </Link>
                &nbsp;
                <a href='' className='comment-author'>
                  {comment.author.username}
                </a>
                <span className='date-posted'>
                  {format(new Date(comment.updatedAt), 'MMMM d, yyyy')}
                </span>
                {comment.author.username === username && (
                  <span
                    className='mod-options'
                    onClick={() => removeComment({ slug, id: comment.id })}
                  >
                    <i className='ion-trash-a'></i>
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ArticleComments
