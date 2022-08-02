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

  const onDeleteUser = async (userId: string) => {
    await userService.remove(userId)
    loadUsers()
  }

  return (
    <section className="admin-page full-screen flex column align-center">
      <h1>Admin dashboard</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th className="column1">User avatar</th>
            <th>Full name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            if (user.role === 'admin') return
            return (
              <tr key={user._id} className="user-info-row">
                <td className="avatar column1">
                  <img src={user.avatar} alt="" />
                </td>
                <td>{user.fullname}</td>
                <td className="actions">
                  <button className="btn-edit">Edit</button>
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
