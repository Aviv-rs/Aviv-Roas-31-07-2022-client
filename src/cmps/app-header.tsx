import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { chatAppRoutes as routes } from 'routes'
import { userService } from 'services/user.service'
import Logo from '../assets/imgs/logo.png'

export function AppHeader() {
  const [user, setUser] = useState(userService.getLoggedinUser())
  const navigate = useNavigate()

  useEffect(() => {
    setUser(userService.getLoggedinUser())
  }, [])

  const onLogout = async () => {
    await userService.logout()
    setUser(null)
    navigate('/')
  }

  return (
    <header className="app-header flex ">
      <div className="logo-container flex align-center column">
        <img src={Logo} alt="" />
      </div>
      {user && (
        <ul className="links clean-list flex align-center">
          {routes.map(route => {
            if (route.path === 'admin' && user.role !== 'admin') return
            return (
              <li key={route.title} className="link">
                <NavLink end to={route.path}>
                  {route.title}
                </NavLink>
              </li>
            )
          })}
          <li className="logout">
            <button className="clean-btn btn-logout" onClick={onLogout}>
              Logout
            </button>
          </li>
          <li className="flex align-center column">
            <div className="avatar-container">
              <img src={user.avatar} alt="" />
            </div>
            <span className="name-container">{user.fullname}</span>
          </li>
        </ul>
      )}
    </header>
  )
}
