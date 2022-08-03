import { UserList } from 'cmps/user-list'
import { FriendRequest } from 'models/friend.model'
import { User } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { friendService } from 'services/friend.service'
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

  const onSendFriendRequest = (friendRequest: FriendRequest) => {
    friendService.sendFriendRequest(friendRequest)
  }

  return (
    <section className="home-page">
      <h1>Add users to your friend list and start chatting!</h1>
      <UserList
        users={users}
        loggedinUserId={user?._id}
        onSendFriendRequest={onSendFriendRequest}
      />
    </section>
  )
}
