import { userService } from 'services/user.service'

export function HomePage() {
  const user = userService.getLoggedinUser()
  return (
    <section className="home-page">
      <pre>{JSON.stringify(user)}</pre>
    </section>
  )
}
