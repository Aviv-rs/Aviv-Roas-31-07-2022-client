import { AppHeader } from 'cmps/app-header'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { chatAppRoutes as routes } from 'routes'
import { userService } from 'services/user.service'
export const ChatApp = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = userService.getLoggedinUser()
    if (!user) navigate('/')
  }, [])

  return (
    <section className="chat-app">
      <AppHeader />
      <main className="layout-padding full-screen">
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </section>
  )
}
