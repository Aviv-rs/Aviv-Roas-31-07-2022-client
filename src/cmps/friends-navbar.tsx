import { Friend } from 'models/friend.model'

export const FriendsNavbar = ({ friends }: { friends: Friend[] }) => {
  return (
    <aside className="friends-navbar flex align-center column">
      <div className="nav-content">
        <div className="friend-count">
          <span>
            {friends.length > 1
              ? `${friends.length} friends`
              : `${friends.length} friend`}{' '}
          </span>
        </div>
        <div className="friend-list">
          {friends.map(friend => {
            return (
              <article key={friend._id} className="friend flex align-center">
                <div className="avatar-container">
                  <img src={friend.avatar} />
                </div>
                <div className="name-container">
                  <span className="fullname">{friend.fullname}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
