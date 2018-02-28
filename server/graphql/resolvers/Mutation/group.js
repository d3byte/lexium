const { models } = require('../../../models')

module.exports = {
    createGroup(root, { input, usersIds }, context) {
        return models.Group.create(input)
            .then(group => group.setUsers(usersIds)
                .then(() => group))
    },

    updateGroup(root, { id, input }, context) {
        return models.Group.findById(id)
            .then(group => {
                return group.update(input)
            })
    },

    addUserToGroup(root, { id, userId }, context) {
        return models.Group.findById(id).then(group => group.addUser(userId))
    },
    
    removeUserFromGroup(root, { id, userId }, context) {
        return models.Group.findById(id)
            .then(group => group.removeUser(userId))
    },

    removeGroup(root, { id }, context) {
        return models.Group.findById(id)
            .then(group => group.destroy())
    }
}