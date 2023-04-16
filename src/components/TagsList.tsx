type TagsListProps = {
  tags: string[]
  setSelectedTags: (selectedTag: string) => void
}

function TagsList({ tags, setSelectedTags }: TagsListProps) {
  return (
    <div className='tag-list'>
      {tags.map((tag) => (
        <a
          key={tag}
          href=''
          className='tag-pill tag-default'
          onClick={(e) => {
            e.preventDefault()
            setSelectedTags(tag)
          }}
        >
          {tag}
        </a>
      ))}
    </div>
  )
}

export default TagsList
