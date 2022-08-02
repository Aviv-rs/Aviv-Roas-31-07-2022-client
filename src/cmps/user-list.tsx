import { User } from 'models/user.model'
import { UserPreview } from './user-preview'

export const UserList = ({ users }: { users: User[] }) => {
  return (
    <section className="user-list flex">
      {users.map((user: User) => (
        <UserPreview key={user._id} user={user} />
      ))}
    </section>
  )
}
