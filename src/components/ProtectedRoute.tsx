import { PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../services/contexts/UserContextProvider'

type ProtectedRouteProps = PropsWithChildren

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogged } = useContext(UserContext)
  return !isLogged ? <Navigate to='/' /> : <>{children}</>
}

export default ProtectedRoute
