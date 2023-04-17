import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import ArticlePreview from '../components/ArticlePreview'
import TagsList from '../components/TagsList'
import { UserContext } from '../services/contexts/UserContextProvider'
import useArticles from '../services/hooks/use-articles'
import useTags from '../services/hooks/use-tags'
import Pagination from '../components/Pagination'

function Home() {
  const { isLogged } = useContext(UserContext)
  const [selectedTag, setSelectedTag] = useState('')
  const [isFeed, setIsFeed] = useState(isLogged)

  const {
    articles,
    isLoading: isArticleLoading,
    page,
    setPage,
    totalPage,
  } = useArticles({ isFeed, tag: selectedTag })
  const { tags, isLoading: isLoadingTags } = useTags()

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
            {isArticleLoading && <div className='article-preview'>Loading Articles...</div>}
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
