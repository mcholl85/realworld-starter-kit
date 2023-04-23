import { useForm } from 'react-hook-form'
import useComments from '../services/hooks/use-comments'
import { useContext } from 'react'
import { UserContext } from '../services/contexts/UserContextProvider'

type CommentFormProps = {
  slug: string
}

function CommentForm({ slug }: CommentFormProps) {
  const {
    user: { image },
  } = useContext(UserContext)
  const { register, handleSubmit, reset } = useForm<Record<'body', string>>()
  const { addComment, addCommentIsError, errors } = useComments({ slug })

  const onSubmit = handleSubmit((data) => {
    addComment({ form: data, slug })
    reset()
  })

  return (
    <>
      {addCommentIsError &&
        errors.map((error) => (
          <ul key={error} className='error-messages'>
            <li>{error}</li>
          </ul>
        ))}
      <form className='card comment-form' onSubmit={onSubmit}>
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
    </>
  )
}

export default CommentForm
