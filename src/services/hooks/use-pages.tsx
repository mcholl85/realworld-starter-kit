import { useEffect, useState } from 'react'
import { DEFAULT_PAGE } from '../../constants/page.constants'
import { DEFAULT_LIMIT } from '../../constants/api.constants'

function usePages() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [totalPage, setTotalPage] = useState(currentPage)

  const setTotal = (count?: number) => {
    setTotalPage(count ? Math.ceil(count / DEFAULT_LIMIT) : currentPage)
  }

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(DEFAULT_PAGE)
  })

  return { currentPage, setCurrentPage, total: totalPage, setTotal }
}

export default usePages
