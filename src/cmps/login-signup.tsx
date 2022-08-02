import { useEffectUpdate } from 'hooks/useEffectUpdate'
import { useForm } from 'hooks/useForm'
import { UserCredLogin, UserCredSignup } from 'models/user.model'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadAndGetImgUrl } from 'services/cloudinary.service'
import { utilService } from 'services/utils'
import defaultAvatar from '../assets/imgs/default-avatar.png'

interface Credentials {
  username: string
  password: string
  fullname?: string
  avatar?: string
}

interface LoginSignupProps {
  onLogin: (credentials: UserCredLogin) => void
  onSignup: (credentials: UserCredSignup) => void
}

export const LoginSignup = (props: LoginSignupProps) => {
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  let [register, credentials, resetFields, changeFields] = useForm({
    username: '',
    password: '',
  } as Credentials)
  const navigate = useNavigate()

  useEffectUpdate(() => {
    const cred = isSignup
      ? {
          avatar: '',
          fullname: '',
          username: '',
          password: '',
        }
      : {
          username: '',
          password: '',
        }

    changeFields(cred)
  }, [isSignup])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (isSignup) {
      try {
        const avatarUrl = !!credentials.avatar
          ? await uploadAndGetImgUrl(credentials.avatar)
          : defaultAvatar
        await props.onSignup({ ...credentials, avatar: avatarUrl })
        navigate('/home')
      } catch (err) {
        setError('Cannot signup, please try again with a different username')
      }
    } else {
      try {
        await props.onLogin(credentials)
        navigate('/home')
      } catch (err) {
        setError('Wrong username or password, please try again')
      }
    }
  }

  return (
    <form onSubmit={ev => handleSubmit(ev)} className="login-signup">
      {error && <div className="error">{error}</div>}
      {Object.keys(credentials).map((field: string) => {
        return (
          <div key={field} className="form-group">
            {field === 'avatar' ? (
              <div className="avatar-container">
                <label htmlFor="avatar">
                  <div className="img-container">
                    <img
                      src={
                        (credentials.avatar &&
                          URL.createObjectURL(credentials.avatar)) ||
                        defaultAvatar
                      }
                      alt=""
                    />
                    <div className="add-avatar-txt-container flex align-center justify-center">
                      {' '}
                      <div className="add-avatar-txt">Add your avatar</div>{' '}
                    </div>
                  </div>
                </label>
                <input id="avatar" {...register(field, '', 'file')} />
              </div>
            ) : (
              <>
                <input required {...register(field, ' ')} autoComplete="no" />
                <label htmlFor={field}>
                  {utilService.capitalize(field) + ' '}
                </label>
              </>
            )}
          </div>
        )
      })}

      <button className="btn-submit" type="submit">
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>

      <div className="horizontal-rule"></div>

      <button
        type="button"
        className="btn-toggle-login"
        onClick={() => {
          setIsSignup(prevIsSignup => !prevIsSignup)
          setError('')
        }}
      >
        {isSignup ? 'Already have an account? log in' : 'Create new account'}
      </button>
    </form>
  )
}
