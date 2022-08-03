import { FriendRequest } from 'models/friend.model'
import { httpService } from './http.service'

export const friendService = {
  sendFriendRequest,
  confirmFriendRequest,
}

async function sendFriendRequest(friendRequest: FriendRequest) {
  await httpService.post('friend', friendRequest)
}

async function confirmFriendRequest(friendRequest: FriendRequest) {
  await httpService.put('friend', friendRequest)
}
