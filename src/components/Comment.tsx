import { Link } from 'react-router-dom'
import { IComment } from '../interfaces'
import { useContext } from 'react'
import { UserContext } from '../services/contexts/UserContextProvider'
import { format } from 'date-fns'
import useComments from '../services/hooks/use-comments'

type CommentProps = {
  comment: IComment
  slug: string
}

function Comment({ comment, slug }: CommentProps) {
  const {
    user: { username },
  } = useContext(UserContext)
  const { removeComment } = useComments({ slug })

  return (
    <div key={comment.id} className='card'>
      <div className='card-block'>
        <p className='card-text'>{comment.body}</p>
      </div>
      <div className='card-footer'>
        <Link to={`/user/${comment.author.username}`} className='comment-author'>
          <img src={comment.author.image} className='comment-author-img' />
        </Link>
        &nbsp;
        <Link to={`/user/${comment.author.username}`} className='comment-author'>
          {comment.author.username}
        </Link>
        <span className='date-posted'>{format(new Date(comment.updatedAt), 'MMMM d, yyyy')}</span>
        {comment.author.username === username && (
          <span className='mod-options' onClick={() => removeComment({ slug, id: comment.id })}>
            <i className='ion-trash-a'></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default Comment
