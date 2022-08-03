export interface Friend {
  _id: string
  fullname: string
  avatar: string
}

export interface FriendRequest {
  fromUser: Friend
  toUser: Friend
  sentAt: Date
  status: string
}
