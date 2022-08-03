import { FriendRequest } from 'models/friend.model'
import { httpService } from './http.service'

export const friendService = {
  sendFriendRequest,
}

async function sendFriendRequest(friendRequest: FriendRequest) {
  await httpService.post('friend', friendRequest)
}
