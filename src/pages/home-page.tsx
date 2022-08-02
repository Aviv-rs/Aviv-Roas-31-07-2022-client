import { UserList } from 'cmps/user-list'
import { User } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'

export function HomePage() {
  const user = userService.getLoggedinUser()
  const [users, setUsers] = useState([] as User[])

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/')
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const users = await userService.getUsers()
    setUsers(users)
  }
  return (
    <section className="home-page">
      <UserList users={users} loggedinUserId={user?._id} />
    </section>
  )
}
