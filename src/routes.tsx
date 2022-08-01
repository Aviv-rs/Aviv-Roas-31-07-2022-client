import { HomePage } from 'pages/home-page'
import { LoginSignupPage } from 'pages/login-signup-page'

export const routes = [
  { path: '/', element: <LoginSignupPage /> },
  { path: '/home', element: <HomePage /> },
]
