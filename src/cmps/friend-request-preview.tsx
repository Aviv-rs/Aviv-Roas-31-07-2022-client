import { FriendRequest } from 'models/friend.model'

export const FriendRequestPreview = ({
  friendRequest,
  onConfirmFriendRequest,
}: {
  friendRequest: FriendRequest
  onConfirmFriendRequest: (friendRequest: FriendRequest) => void
}) => {
  return (
    <article className="friend-request-preview flex column">
      <div className="avatar-container">
        <img src={friendRequest.fromUser.avatar} alt="User's avatar photo" />
      </div>
      <div className="preview-padding">
        <div className="fullname-container">
          <h1 className="fullname">{friendRequest.fromUser.fullname}</h1>
        </div>
        <div className="add-friend-container flex justify-center">
          <button
            onClick={() => {
              onConfirmFriendRequest(friendRequest)
            }}
            className="btn-add-friend"
          >
            Confirm
          </button>
        </div>
        {/* <div className="remove-friend-container flex justify-center">
          <button className="btn-remove-friend">Delete</button>
        </div> */}
      </div>
    </article>
  )
}
