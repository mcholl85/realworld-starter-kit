import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PrivateRoute from './components/PrivateRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'
import CreateArticle from './pages/CreateArticle'
import EditArticle from './pages/EditArticle'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Article from './pages/Article'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: (
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editor',
        element: (
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editor/:slug',
        element: (
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        ),
      },
      {
        path: '/article/:slug',
        element: <Article />,
      },
      {
        path: '/:username/',
        element: <Profile isFavorite={false} />,
      },
      {
        path: '/:username/favorites',
        element: <Profile isFavorite={true} />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
