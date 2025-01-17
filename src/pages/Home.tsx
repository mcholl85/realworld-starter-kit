import classNames from 'classnames'
import { useContext } from 'react'
import TagsList from '../components/TagsList'
import { UserContext } from '../services/contexts/UserContextProvider'
import ArticlesList from '../components/ArticlesList'
import useNav from '../services/hooks/use-nav'

function Home() {
  const { isLogged } = useContext(UserContext)
  const { isGlobal, setIsGlobal, isFeed, setIsFeed, selectedTag, setSelectedTag } = useNav({
    isLogged,
  })

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
                        setIsGlobal(false)
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
                      onClick={(e) => e.preventDefault()}
                    >
                      # {selectedTag}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <ArticlesList isFeed={isFeed} tag={selectedTag} />
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
