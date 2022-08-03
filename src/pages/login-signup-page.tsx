import { LoginSignup } from 'cmps/login-signup'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { userService } from 'services/user.service'
import Logo from '../assets/imgs/logo.png'

export const LoginSignupPage = () => {
  const onSignup = async (credentials: UserCredSignup) => {
    await userService.signup(credentials)
  }

  const onLogin = async (credentials: UserCredLogin) => {
    await userService.login(credentials)
  }

  return (
    <section className="login-signup-page full-screen flex align-center">
      <div className="welcome">
        <div className="logo-container">
          <img src={Logo} alt="" />
        </div>

        <h2>Make new friends to hang out with and chat on ChitChat</h2>
      </div>
      <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    </section>
  )
}
