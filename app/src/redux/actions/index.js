import { SET_USER_INFO } from '../types'

export function setUserInfo(user) {
    return { type: setUserInfo, user }
}