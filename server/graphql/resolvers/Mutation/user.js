const bcrypt = require('bcryptjs')
const { models } = require('../../../models')
const { getUserId } = require('../../../utils')

module.exports = {
    updateUser(root, { id, input }, context) {
        return models.User.findById(id)
            .then(user => {
                return user.update(input)
            })
    },

    async updateUserAvatar(root, { token, avatarUrl }) {
        const userId = await getUserId(token)
        console.log(userId)
        const user = await models.User.findById(userId)
        return user.update({ avatarUrl })
    },
    
    verifyPassword(root, { userId, password }, context) {
        return models.User.findById(userId)
        .then(user => {
            const value = bcrypt.compare(password, user.password).then(value => value)
            return { valid: value }
        })
    },

    async changePassword(root, { userId, password }, context) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return models.User.findById(userId)
            .then(user => user.update({ password: hashedPassword }))
    },

    removeUser(root, { id }, context) {
        return models.User.findById(id)
            .then(user => user.destroy())
    },
}