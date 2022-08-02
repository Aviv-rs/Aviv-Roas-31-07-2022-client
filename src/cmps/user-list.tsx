import { User } from 'models/user.model'
import { UserPreview } from './user-preview'

export const UserList = ({
  users,
  loggedinUserId,
}: {
  users: User[]
  loggedinUserId?: string
}) => {
  return (
    <section className="user-list flex align-center">
      {users.map((user: User) => {
        if (user._id === loggedinUserId) return
        return <UserPreview key={user._id} user={user} />
      })}
    </section>
  )
}
