import { AdminPage } from 'pages/admin-page'
import { ChatApp } from 'pages/chat-app'
import { HomePage } from 'pages/home-page'
import { LoginSignupPage } from 'pages/login-signup-page'

export const mainAppRoutes = [
  { path: '/', element: <LoginSignupPage /> },
  { path: '/chat/*', element: <ChatApp /> },
]

export const chatAppRoutes = [
  { path: '', element: <HomePage />, title: 'Home' },
  { path: 'admin', element: <AdminPage />, title: 'Admin' },
]
