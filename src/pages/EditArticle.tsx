import { useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import useArticle from '../services/hooks/use-article'

export type FormValues = {
  title: string
  description: string
  body: string
  tagList: Array<string>
}

function EditArticle() {
  const { slug } = useParams() as Record<'slug', string>
  const { article, updateArticle } = useArticle({ slug, fetched: true })

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {article && <ArticleForm onSubmit={updateArticle} slug={slug} formValues={article} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditArticle
