import ArticleForm from '../components/ArticleForm'
import useArticle from '../services/hooks/use-article'

function CreateArticle() {
  const { defaultArticle, isCreateArticleError, errors, createArticle } = useArticle({
    fetched: false,
  })

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {isCreateArticleError &&
              errors.map((error) => (
                <ul key={error} className='error-messages'>
                  <li>{error}</li>
                </ul>
              ))}
            <ArticleForm onSubmit={createArticle} formValues={defaultArticle} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle
