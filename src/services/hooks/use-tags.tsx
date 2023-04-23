import { useState } from 'react'

type UseTagsProps = {
  tagsList?: string[]
}

function useTags({ tagsList }: UseTagsProps) {
  const [tags, setTags] = useState(tagsList || [])

  const addTag = (value: string) => {
    if (!tags.includes(value)) setTags([value, ...tags])
  }

  const removeTag = (currentTag: string) => {
    const newTagsList = tags.filter((tag) => tag !== currentTag)
    setTags(newTagsList)
  }

  return { tags, addTag, removeTag }
}

export default useTags
