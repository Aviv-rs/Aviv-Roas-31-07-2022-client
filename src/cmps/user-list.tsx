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
        if (user._id === loggedinUserId) return
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
