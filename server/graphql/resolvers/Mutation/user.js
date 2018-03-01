const { models } = require('../../../models')
const bcrypt = require('bcryptjs')

module.exports = {
    updateUser(root, { id, input }, context) {
        return models.User.findById(id)
            .then(user => {
                return user.update(input)
            })
    },
    
    verifyPassword(root, { userId, password }, context) {
        return models.User.findById(userId)
        .then(user => {
            const value = bcrypt.compare(password, user.password).then(value => value)
            return { value }
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