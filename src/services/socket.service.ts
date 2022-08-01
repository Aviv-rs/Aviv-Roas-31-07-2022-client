import { io, Socket } from 'socket.io-client'
import { userService } from './user.service'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'localhost:3030'
export const socketService = createSocketService()

// export const socketService = createDummySocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  let socket!: Socket
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user && user._id) {
          this.login(user._id)
        }
      }, 500)
    },
    on(eventName: string, cb: (...args: any[]) => void) {
      socket.on(eventName, cb)
    },
    off(eventName: string, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName: string, data: any) {
      socket.on(eventName, data)
    },
    login(userId: string) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
  }
  return socketService
}

// eslint-disable-next-line
// function createDummySocketService() {
//   let listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() { },
//     logout() { },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName] || []), cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else
//         listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     debugMsg() {
//       this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
//     },
//   }
//   window.listenersMap = listenersMap
//   return socketService
// }
