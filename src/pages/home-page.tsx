import { FriendRequestPreview } from 'cmps/friend-request-preview'
import { FriendsNavbar } from 'cmps/friends-navbar'
import { UserList } from 'cmps/user-list'
import { Friend, FriendRequest } from 'models/friend.model'
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

  const onConfirmFriendRequest = (friendRequest: FriendRequest) => {
    friendService.confirmFriendRequest(friendRequest)
  }

  return (
    <section className="home-page">
      <h1>Add users to your friend list and start chatting!</h1>
      {user?.friendRequests.map(friendReq => {
        if (
          friendReq.status === 'confirmed' ||
          friendReq.fromUser._id === user._id
        )
          return
        return (
          <FriendRequestPreview
            key={friendReq.fromUser._id}
            friendRequest={friendReq}
            onConfirmFriendRequest={onConfirmFriendRequest}
          />
        )
      })}
      <UserList
        users={users}
        loggedinUserId={user?._id}
        onSendFriendRequest={onSendFriendRequest}
      />

      <FriendsNavbar friends={user?.friends as Friend[]} />
    </section>
  )
}

// [
//   {
//     _id: '1',
//     fullname: 'JD',
//     avatar:
//       'http://res.cloudinary.com/da563p1yb/image/upload/v1659418275/n158qh8yn9szodpwegmi.jpg',
//   },
// ]
