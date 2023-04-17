import { useQuery } from '@tanstack/react-query'
import { getTags } from '../api/tags'
import { QUERY_TAGS_KEY } from '../../constants/query.constants'

function useTags() {
  const { data: tags, isLoading } = useQuery({
    queryKey: [QUERY_TAGS_KEY],
    queryFn: async () => await getTags(),
    retry: 0,
  })

  return { tags, isLoading }
}

export default useTags
