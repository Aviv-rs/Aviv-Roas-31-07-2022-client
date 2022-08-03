import { Friend, FriendRequest } from './friend.model'

export interface User {
  _id: string
  fullname: string
  username: string
  avatar: string
  role: string
  friends: Friend[]
  friendRequests: FriendRequest[]
}

export interface UserCredSignup {
  fullname: string
  username: string
  password: string
  avatar: string
}

export interface UserCredLogin {
  username: string
  password: string
}

export interface UserCredEdit {
  _id?: string
  avatar: string
  username: string
  fullname: string
  password?: string
}
