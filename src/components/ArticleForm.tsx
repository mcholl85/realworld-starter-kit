import { useForm } from 'react-hook-form'
import { FormValues } from '../pages/EditArticle'
import TagsInput from './TagsInput'

type ArticleFormProps = {
  onSubmit: ({ form, slug }: { form: FormValues; slug?: string }) => void
  formValues: FormValues
  slug?: string
}

function ArticleForm({ onSubmit, formValues, slug }: ArticleFormProps) {
  const { register, setValue, handleSubmit } = useForm({ defaultValues: formValues })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ form: data, slug }))}>
      <fieldset>
        <fieldset className='form-group'>
          <input
            {...register('title')}
            type='text'
            className='form-control form-control-lg'
            placeholder='Article Title'
          />
        </fieldset>
        <fieldset className='form-group'>
          <input
            {...register('description')}
            type='text'
            className='form-control'
            placeholder="What's this article about?"
          />
        </fieldset>
        <fieldset className='form-group'>
          <textarea
            {...register('body')}
            className='form-control'
            rows={8}
            placeholder='Write your article (in markdown)'
          ></textarea>
        </fieldset>
        <TagsInput tagsList={formValues.tagList} setTagsForm={setValue} />
      </fieldset>
      <button className='btn btn-lg pull-xs-right btn-primary'>Publish Article</button>
    </form>
  )
}

export default ArticleForm
