import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'

export function HomePage() {
  const user = userService.getLoggedinUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/')
  }, [])

  return <section className="home-page"></section>
}
