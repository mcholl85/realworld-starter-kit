import classNames from 'classnames'
import { useContext } from 'react'
import ArticlePreview from '../components/ArticlePreview'
import TagsList from '../components/TagsList'
import { UserContext } from '../services/contexts/UserContextProvider'
import useArticles from '../services/hooks/use-articles'
import useTags from '../services/hooks/use-tags'
import Pagination from '../components/Pagination'

function Home() {
  const { isLogged } = useContext(UserContext)
  const {
    articles,
    isLoading,
    isFeed,
    setIsFeed,
    isGlobal,
    setIsGlobal,
    isTag,
    setIsTag,
    selectedTag,
    setSelectedTag,
    page,
    setPage,
    totalPage,
  } = useArticles({ isLogged })
  const { tags, isLoading: isLoadingTags } = useTags()

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
                        setIsGlobal(false)
                        setIsFeed(true)
                        setIsTag(false)
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
                    className={classNames('nav-link', { active: isGlobal })}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsGlobal(true)
                      setIsFeed(false)
                      setIsTag(false)
                      setPage(1)
                      setSelectedTag('')
                    }}
                  >
                    Global Feed
                  </a>
                </li>
                {isTag && (
                  <li className='nav-item'>
                    <a
                      href=''
                      className={classNames('nav-link', { active: isTag })}
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
            {isLoading && <div className='article-preview'>Loading Articles...</div>}
            {articles &&
              articles.map((article) => (
                <ArticlePreview
                  key={article.slug}
                  slug={article.slug}
                  tagList={article.tagList}
                  title={article.title}
                  description={article.description}
                  updateAt={article.updatedAt}
                  favorited={article?.favorited}
                  favoritesCount={article?.favoritesCount}
                  author={article?.author}
                />
              ))}
            {<Pagination totalPage={totalPage} currentPage={page} setPage={setPage} />}
          </div>

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>
              {isLoadingTags && <div>Loading tags...</div>}
              {tags && <TagsList tags={tags} setSelectedTags={setSelectedTag} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
