import { UserList } from 'cmps/user-list'
import { User } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'

export const AdminPage = () => {
  const [users, setUsers] = useState([] as User[])
  const navigate = useNavigate()
  useEffect(() => {
    const loggedinUser = userService.getLoggedinUser()
    if (loggedinUser?.role !== 'admin') return navigate('/chat')

    loadUsers()
  }, [])

  const loadUsers = async () => {
    const users = await userService.getUsers()
    setUsers(users)
  }

  return (
    <section className="admin-page">
      <h1>Admin dashboard</h1>
      <UserList users={users} />
    </section>
  )
}
