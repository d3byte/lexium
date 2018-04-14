const { models } = require('../../../models')
const { getUserId } = require('../../../utils')

module.exports = {
    async createGroup(root, { name, superUsers }, context) {
        const group = await models.Group.create({ name, superUsers: JSON.stringify(superUsers[0]) })
        // ЛЮТЫЙ КОСТЫЛЬ, НУЖНО ПОМЕНЯТЬ ПОТОМ
        const user = await models.User.findById(superUsers[0])
        user.addGroup(group.id)
        group.addUser(user.id)
        return group
    },

    async updateGroupAvatar(root, { token, avatarUrl, id }) {
        const userId = await getUserId(token)
        const group = await models.Group.findById(id)
        let userInGroup = false
        const users = await group.getUsers()
        users.map(user => {
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

    async addUsersToGroup(root, { token, id, users }, context) {
        const userId = await getUserId(token)
        const group = await models.Group.findById(id)
        let userInGroup = false
        const groupUsers = await group.getUsers()
        groupUsers.map(user => {
            if(user.id === userId) {
                userInGroup = true
            }
        })
        if (userInGroup) {
            users.map(async userId => {
                const user = await models.User.findById(userId)
                return user.addGroup(id)
            })
            return group.addUsers(users).then(() => group)
        }
        return { error: 'Пользователь не состоит в группе' }
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