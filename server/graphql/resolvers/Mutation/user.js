const { models } = require('../../../models')

module.exports = {
    updateUser(root, { id, input }, context) {
        return models.User.findById(id)
            .then(user => {
                return user.update(input)
            })
    },

    removeUser(root, { id }, context) {
        return models.User.findById(id)
            .then(user => user.destroy())
    },
}