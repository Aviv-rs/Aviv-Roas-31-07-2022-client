import { useEffectUpdate } from 'hooks/useEffectUpdate'
import { useForm } from 'hooks/useForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { utilService } from 'services/utils'

interface Credentials {
  username: string
  password: string
  fullname?: string
}

export const LoginSignup = (props: any) => {
  const [isSignup, setIsSignup] = useState(false)
  const [isWrongLogin, setIsWrongLogin] = useState(false)
  let [register, credentials, resetFields, changeFields] = useForm({
    username: '',
    password: '',
  } as Credentials)
  const navigate = useNavigate()

  useEffectUpdate(() => {
    const cred = isSignup
      ? {
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

  return (
    <form className="login-signup">
      {Object.keys(credentials).map((field: string) => {
        return (
          <div key={field} className="form-group">
            <input
              required
              {...register(field, utilService.capitalize(field))}
              autoComplete="no"
            />
            <label htmlFor="name">{utilService.capitalize(field) + ' '}</label>
          </div>
        )
      })}

      <button
        type="button"
        onClick={() => setIsSignup(prevIsSignup => !prevIsSignup)}
      >
        {isSignup ? 'Already have an account? log in' : 'Create new account'}
      </button>
    </form>
  )
}
