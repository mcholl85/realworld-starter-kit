import { useQuery } from '@tanstack/react-query'
import { QUERY_TAGS_KEY } from '../constants/query.constants'
import { getTags } from '../services/api/tags'

type TagsListProps = {
  setSelectedTags: (selectedTag: string) => void
}

function TagsList({ setSelectedTags }: TagsListProps) {
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_TAGS_KEY],
    queryFn: async () => await getTags(),
    retry: 0,
  })

  if (isLoading) return <div className='tag-list'>Loading...</div>
  if (isError) return <div className='tag-list'>Something wrong append</div>

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
