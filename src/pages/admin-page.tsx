import { EditUserModal } from 'cmps/edit-user-modal'
import { UserList } from 'cmps/user-list'
import { User, UserCredUpdate } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from 'services/user.service'

export const AdminPage = () => {
  const [users, setUsers] = useState([] as User[])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState({} as User)
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

  const onUpdateUser = async (cred: UserCredUpdate) => {
    await userService.update({ ...userToUpdate, ...cred })
    loadUsers()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="admin-page full-screen flex column align-center">
      <h1>Admin dashboard</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th className="column1">User avatar</th>
            <th>Full name</th>
            <th>Username</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            if (user.role === 'admin') return
            return (
              <tr key={user._id} className="user-info-row">
                <td className="column1">
                  <div className="avatar">
                    <img src={user.avatar} alt="" />
                  </div>
                </td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>
                  <div className="actions flex">
                    <button
                      onClick={() => {
                        setUserToUpdate(user)
                        setIsModalOpen(true)
                      }}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteUser(user._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isModalOpen && (
        <EditUserModal
          user={userToUpdate}
          submitFn={onUpdateUser}
          closeModalFn={closeModal}
        />
      )}
    </section>
  )
}
