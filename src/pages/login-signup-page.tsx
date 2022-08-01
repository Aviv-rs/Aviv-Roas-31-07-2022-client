import { LoginSignup } from 'cmps/login-signup'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { userService } from 'services/user.service'

export const LoginSignupPage = () => {
  const onSignup = async (credentials: UserCredSignup) => {
    await userService.signup(credentials)
  }

  const onLogin = async (credentials: UserCredLogin) => {
    await userService.login(credentials)
  }

  return (
    <section className="login-signup-page full-screen flex justify-center">
      <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    </section>
  )
}
