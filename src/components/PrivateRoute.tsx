import { PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../services/contexts/UserContextProvider'

type PrivateRouteProps = PropsWithChildren

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogged } = useContext(UserContext)
  return isLogged ? <Navigate to='/' /> : <>{children}</>
}

export default PrivateRoute
