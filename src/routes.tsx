import { AdminPage } from 'pages/admin-page'
import { HomePage } from 'pages/home-page'
import { LoginSignupPage } from 'pages/login-signup-page'

export const routes = [
  { path: '/', element: <LoginSignupPage /> },
  { path: '/home', element: <HomePage />, title: 'Home' },
  { path: '/admin', element: <AdminPage />, title: 'Admin' },
]
