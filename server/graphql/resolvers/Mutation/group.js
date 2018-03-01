const { models } = require('../../../models')

module.exports = {
    createGroup(root, { name, usersIds, superUsers }, context) {
        let id
        return models.Group.create({ name, superUsers: JSON.stringify(superUsers[0]) })
            .then(group => {
                id = group.id
                return group.setUsers(usersIds)
            }).then(theGroup => models.Group.findById(id))
    },

    updateGroup(root, { id, input }, context) {
        let { name, superUsers } = input
        superUsers = JSON.stringify(superUsers[0])
        return models.Group.findById(id)
            .then(group => group.update({ name, superUsers }))
    },

    addUserToGroup(root, { id, userId }, context) {
        return models.Group.findById(id)
            .then(group => group.addUser(userId))
            .then(theGroup => models.Group.findById(id))
    },
    
    removeUserFromGroup(root, { id, userId }, context) {
        return models.Group.findById(id)
            .then(group => group.removeUser(userId))
            .then(theGroup => models.Group.findById(id))
    },

    removeGroup(root, { id }, context) {
        return models.Group.findById(id)
            .then(group => group.destroy())
    }
}