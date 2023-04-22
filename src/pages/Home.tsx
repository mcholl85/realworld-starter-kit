import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import TagsList from '../components/TagsList'
import { UserContext } from '../services/contexts/UserContextProvider'
import useArticles from '../services/hooks/use-articles'
import Pagination from '../components/Pagination'
import ArticlesList from '../components/ArticlesList'

function Home() {
  const { isLogged } = useContext(UserContext)
  const [selectedTag, setSelectedTag] = useState('')
  const [isFeed, setIsFeed] = useState(isLogged)

  const {
    articles,
    articlesCount,
    isLoading: isArticleLoading,
    isError: isArticleError,
    page,
    setPage,
    totalPage,
  } = useArticles({ isFeed, tag: selectedTag })

  useEffect(() => {
    if (selectedTag) {
      setIsFeed(false)
      setPage(1)
    }
  }, [selectedTag])

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                {isLogged && (
                  <li className='nav-item'>
                    <a
                      href=''
                      className={classNames('nav-link', { active: isFeed })}
                      onClick={(e) => {
                        e.preventDefault()
                        setIsFeed(true)
                        setPage(1)
                        setSelectedTag('')
                      }}
                    >
                      Your Feed
                    </a>
                  </li>
                )}

                <li className='nav-item'>
                  <a
                    href=''
                    className={classNames('nav-link', { active: !isFeed && !selectedTag })}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsFeed(false)
                      setPage(1)
                      setSelectedTag('')
                    }}
                  >
                    Global Feed
                  </a>
                </li>
                {selectedTag && (
                  <li className='nav-item'>
                    <a
                      href=''
                      className={classNames('nav-link', { active: selectedTag })}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      # {selectedTag}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <ArticlesList
              articles={articles}
              articlesCount={articlesCount}
              isError={isArticleError}
              isLoading={isArticleLoading}
            />
            <Pagination totalPage={totalPage} currentPage={page} setPage={setPage} />
          </div>

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
              <TagsList setSelectedTags={setSelectedTag} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
