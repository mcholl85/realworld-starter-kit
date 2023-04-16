import { useQuery } from '@tanstack/react-query'
import { getTags } from '../api/tags'

function useTags() {
  const { data: tags, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getTags(),
    retry: 0,
  })

  return { tags, isLoading }
}

export default useTags
