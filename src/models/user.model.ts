export interface User {
  _id?: string
  fullname: string
  username: string
  password: string
  avatar?: string
}

export interface UserCredSignup {
  fullname: string
  username: string
  password: string
  avatar?: string
}

export interface UserCredLogin {
  username: string
  password: string
}
