import { KeyboardEvent, useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FormValues } from '../pages/EditArticle'
import useTags from '../services/hooks/use-tags'

type TagsInputProps = {
  setTagsForm: UseFormSetValue<FormValues>
  tagsList?: Array<string>
}

function TagsInput({ tagsList, setTagsForm }: TagsInputProps) {
  const { tags, addTag, removeTag } = useTags({ tagsList })
  const [input, setInput] = useState<string>('')

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim()

    if (e.key === 'Enter') {
      e.preventDefault()
      if (value) addTag(value)
      setInput('')
    }
  }

  useEffect(() => {
    setTagsForm('tagList', tags)
  }, [tags])

  return (
    <fieldset className='form-group'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='text'
        className='form-control'
        placeholder='Enter tags'
        onKeyDown={handleKeyEnter}
      />
      <div className='tag-list'>
        {tags.map((tag) => (
          <span key={tag} className='tag-default tag-pill'>
            <i className='ion-close-round' onClick={() => removeTag(tag)}></i>
            {tag}
          </span>
        ))}
      </div>
    </fieldset>
  )
}

export default TagsInput
