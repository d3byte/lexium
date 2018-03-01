export default {
    authorize(state, { token, user }) {
        state.user = user
        state.token = token
    }

    
}
