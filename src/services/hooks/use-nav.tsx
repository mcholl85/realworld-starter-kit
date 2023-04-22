import { useEffect, useState } from 'react'

type useNavProps = {
  isLogged: boolean
}

const DEFAULT_SELECTEDTAG = ''

function useNav({ isLogged }: useNavProps) {
  const [selectedTag, setSelectedTag] = useState(DEFAULT_SELECTEDTAG)
  const [isFeed, setIsFeed] = useState(isLogged)
  const [isGlobal, setIsGlobal] = useState(!isLogged)

  useEffect(() => {
    if (selectedTag) {
      setIsFeed(false)
      setIsGlobal(false)
    }
  }, [selectedTag])

  useEffect(() => {
    if (isGlobal || isFeed) setSelectedTag(DEFAULT_SELECTEDTAG)
  }, [isGlobal, isFeed])

  return { isGlobal, setIsGlobal, isFeed, setIsFeed, selectedTag, setSelectedTag }
}

export default useNav
