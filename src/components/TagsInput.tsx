import { KeyboardEvent, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FormValues } from '../pages/EditArticle'

type TagsInputProps = {
  setTagsForm: UseFormSetValue<FormValues>
  tagsList?: Array<string>
}

function TagsInput({ tagsList, setTagsForm }: TagsInputProps) {
  const [input, setInput] = useState<string>('')
  const [tags, setTags] = useState<Array<string>>(tagsList || [])

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = (e.target as HTMLInputElement).value.trim()

      if (value && !tags.includes(value)) {
        const newTagsList = [value, ...tags]

        setTags(newTagsList)
        setInput('')
        setTagsForm('tagList', newTagsList)
      }
    }
  }
  const removeTag = (currentTag: string) => {
    const newTagsList = tags.filter((tag) => tag !== currentTag)

    setTags(newTagsList)
    setTagsForm('tagList', newTagsList)
  }

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
