import { combineReducers } from 'redux'
import { SET_USER_INFO } from '../types'

function userInfo(state = initialState, action) {
    switch(action) {
        case SET_USER_INFO:
            return Object.assign({}, state, {
                user: action.payload
            })
        case REMOVE_USER_INFO:
            return Object.assign({}, state, {
                user: {}
            })
        default:
            return state
    }
}

const reducer = combineReducers({
    userInfo,
})

export default reducer