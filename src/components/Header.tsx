import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../services/contexts/UserContextProvider'

function Header() {
  const {
    isLogged,
    user: { username, image },
  } = useContext(UserContext)

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink className='nav-link' to=''>
              Home
            </NavLink>
          </li>

          {isLogged ? (
            <>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/editor'>
                  <i className='ion-compose'></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/settings'>
                  <i className='ion-gear-a'></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={`/${username}/`}>
                  <img src={image} className='user-pic' />
                  {username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Sign in
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
