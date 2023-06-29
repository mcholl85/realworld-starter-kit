import classNames from 'classnames'

type PaginationProps = {
  totalPage: number
  currentPage: number
  setPage: (page: number) => void
}

function Pagination({ totalPage, currentPage, setPage }: PaginationProps) {
  return (
    <nav>
      <ul className='pagination'>
        {totalPage !== 1 &&
          [...Array(totalPage).keys()].map((index) => (
            <li
              key={index}
              className={classNames('page-item ng-scope', { active: index + 1 === currentPage })}
            >
              <button className='page-link ng-binding' onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Pagination
