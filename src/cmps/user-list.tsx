import { FriendRequest } from 'models/friend.model'
import { User } from 'models/user.model'
import { UserPreview } from './user-preview'

export const UserList = ({
  users,
  loggedinUserId,
  onSendFriendRequest,
}: {
  users: User[]
  loggedinUserId?: string
  onSendFriendRequest: (friendRequest: FriendRequest) => void
}) => {
  return (
    <section className="user-list flex align-center">
      {users.map((user: User) => {
        const isFriendRequest =
          user.friendRequests.findIndex(
            friendReq => friendReq.toUser._id === loggedinUserId
          ) > -1 ||
          user.friendRequests.findIndex(
            friendReq => friendReq.fromUser._id === loggedinUserId
          ) > -1
        if (user._id === loggedinUserId || isFriendRequest) return
        return (
          <UserPreview
            onSendFriendRequest={onSendFriendRequest}
            key={user._id}
            user={user}
          />
        )
      })}
    </section>
  )
}
