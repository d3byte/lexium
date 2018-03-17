const { models } = require('../../../models')
const { getUserId } = require('../../../utils')

module.exports = {
    createGroup(root, { name, usersIds, superUsers }, context) {
        let id
        return models.Group.create({ name, superUsers: JSON.stringify(superUsers[0]) })
            .then(group => {
                id = group.id
                return group.setUsers(usersIds)
            }).then(theGroup => models.Group.findById(id))
    },

    async updateGroupAvatar(root, { token, avatarUrl, id }) {
        const userId = await getUserId(token)
        const group = await models.Group.findById(id)
        let userInGroup = false
        group.users.map(user => {
            if(user.id === userId) {
                userInGroup = true
            }
        })
        if (userInGroup) {
            return group.update({ avatarUrl })
        }
        return { error: 'Пользователь не состоит в группе' }
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
    
    async removeUserFromGroup(root, { token, id }, context) {
        const userId = await getUserId(token)
        return models.Group.findById(id)
            .then(group => {
                let userIsInGroup = false
                group.getUsers().then(users => {
                    users.map(user => {
                        if (user.id === userId) {
                            userIsInGroup = true
                        }
                    })
                    if (userIsInGroup) {
                        return users.length === 1 ? 
                            group.destroy() : 
                            group.removeUser(userId)
                    }
                    return { error: 'Вы не состоите в данной группе!' }
                })
            })
            .then(() => ({ valid: true }))
            .catch(() => ({ error: 'Произошла ошибка во время покидания группы' }))
    },

    async removeGroup(root, { id }, context) {
        const group = await models.Group.findById(id)
        return group.destroy()
    }
}