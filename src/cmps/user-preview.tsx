import { FriendRequest } from 'models/friend.model'
import { User } from 'models/user.model'
import {
  socketService,
  SOCKET_EMIT_USER_SENT_FRIEND_REQUEST,
} from 'services/socket.service'
import { userService } from 'services/user.service'

export const UserPreview = ({
  user,
  onSendFriendRequest,
}: {
  user: User
  onSendFriendRequest: (friendRequest: FriendRequest) => void
}) => {
  const loggedinUser = userService.getLoggedinUser()

  return (
    <article className="user-preview flex column">
      <div className="avatar-container">
        <img src={user.avatar} alt="User's avatar photo" />
      </div>
      <div className="preview-padding">
        <div className="fullname-container">
          <h1 className="fullname">{user.fullname}</h1>
        </div>
        <div className="add-friend-container flex justify-center">
          <button
            onClick={() => {
              const { _id, avatar, fullname } = user
              const sentAt = new Date()
              onSendFriendRequest({
                fromUser: {
                  _id: loggedinUser?._id,
                  avatar: loggedinUser?.avatar,
                  fullname: loggedinUser?.fullname,
                },
                toUser: { _id, avatar, fullname },
                sentAt,
                status: 'waiting',
              } as FriendRequest)
            }}
            className="btn-add-friend"
          >
            Add Friend
          </button>
        </div>
        {/* <div className="remove-friend-container flex justify-center">
          <button className="btn-remove-friend">Remove</button>
        </div> */}
      </div>
    </article>
  )
}
