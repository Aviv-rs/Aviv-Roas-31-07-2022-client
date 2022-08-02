import { User } from 'models/user.model'

export const UserPreview = ({ user }: { user: User }) => {
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
          <button className="btn-add-friend">Add Friend</button>
        </div>
        <div className="remove-friend-container flex justify-center">
          <button className="btn-remove-friend">Remove</button>
        </div>
      </div>
    </article>
  )
}
