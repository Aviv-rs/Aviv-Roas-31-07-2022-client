import { FriendRequestPreview } from 'cmps/friend-request-preview'
import { FriendsNavbar } from 'cmps/friends-navbar'
import { UserList } from 'cmps/user-list'
import { Friend, FriendRequest } from 'models/friend.model'
import { User } from 'models/user.model'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { friendService } from 'services/friend.service'
import {
  socketService,
  SOCKET_EVENT_MY_FRIEND_REQUEST_CONFIRMED,
  SOCKET_EVENT_RECIEVED_FRIEND_REQUEST,
  SOCKET_EMIT_USER_SENT_FRIEND_REQUEST,
  SOCKET_EMIT_USER_CONFIRMED_FRIEND_REQUEST,
} from 'services/socket.service'
import { userService } from 'services/user.service'

export function HomePage() {
  const [loggedinUser, setLoggedInUser] = useState(
    userService.getLoggedinUser() as User
  )
  const [users, setUsers] = useState([] as User[])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedinUser) navigate('/')
    loadUsers()
    socketService.on(
      SOCKET_EVENT_MY_FRIEND_REQUEST_CONFIRMED,
      onRefreshLoggedinUser
    )
    socketService.on(
      SOCKET_EVENT_RECIEVED_FRIEND_REQUEST,
      onRefreshLoggedinUser
    )

    return () => {
      socketService.off(SOCKET_EVENT_MY_FRIEND_REQUEST_CONFIRMED)
      socketService.off(SOCKET_EVENT_RECIEVED_FRIEND_REQUEST)
    }
  }, [])

  const onRefreshLoggedinUser = async () => {
    console.log('REFRESHED')
    const user = await userService.refreshLoggedinUser()
    console.log('User friends:', user?.friends)
    if (user) setLoggedInUser(user)
  }

  const loadUsers = async () => {
    const users = await userService.getUsers()
    setUsers(users)
  }

  const onSendFriendRequest = async (friendRequest: FriendRequest) => {
    await friendService.sendFriendRequest(friendRequest)
    const user = await userService.refreshLoggedinUser()
    if (user) setLoggedInUser(user)

    setUsers((prevUsers: User[]) =>
      prevUsers.filter((user: User) => user._id !== friendRequest.toUser._id)
    )
    socketService.emit(SOCKET_EMIT_USER_SENT_FRIEND_REQUEST, friendRequest)
  }

  const onConfirmFriendRequest = async (friendRequest: FriendRequest) => {
    await friendService.confirmFriendRequest(friendRequest)
    const user = await userService.refreshLoggedinUser()
    if (user) setLoggedInUser(user)

    socketService.emit(SOCKET_EMIT_USER_CONFIRMED_FRIEND_REQUEST, friendRequest)
  }

  return (
    <section className="home-page full-screen flex">
      <FriendsNavbar friends={loggedinUser?.friends as Friend[]} />

      <main className="main-content layout-padding">
        {loggedinUser?.friendRequests.some(
          friendReq =>
            friendReq.status === 'waiting' &&
            friendReq.fromUser._id !== loggedinUser._id
        ) && (
          <>
            <div className="friend-requests-title">
              <h1>Friend Requests</h1>
            </div>
            <div className="friend-requests-list">
              {loggedinUser?.friendRequests.map(friendReq => {
                if (
                  friendReq.status === 'confirmed' ||
                  friendReq.fromUser._id === loggedinUser._id
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
            </div>
            <hr />
          </>
        )}
        <div className="friend-suggestions-title">
          <h1>Friend suggestions</h1>
        </div>
        <UserList
          users={users}
          loggedinUserId={loggedinUser?._id}
          onSendFriendRequest={onSendFriendRequest}
        />
      </main>
    </section>
  )
}
