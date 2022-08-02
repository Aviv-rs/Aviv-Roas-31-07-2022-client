import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from 'routes'
import { userService } from 'services/user.service'
import Logo from '../assets/imgs/logo.png'

export function AppHeader() {
  const [user, setUser] = useState(userService.getLoggedinUser())

  return (
    <header className="app-header flex ">
      <div className="logo-container flex align-center column">
        <img src={Logo} alt="" />
      </div>
      {user && (
        <ul className="links clean-list flex align-center">
          {routes.map(
            route =>
              route.title && (
                <li key={route.title} className="link">
                  <NavLink to={route.path}>{route.title}</NavLink>
                </li>
              )
          )}
        </ul>
      )}
    </header>
  )
}
