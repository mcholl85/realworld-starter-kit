import { Outlet } from 'react-router-dom'
import { UserContextProvider } from './services/contexts/UserContextProvider'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserContextProvider>
  )
}
export default App
