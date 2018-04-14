const { models } = require('../../../models')
const { getUserId } = require('../../../utils')

module.exports = {
    // User
    async createTask(root, { input, groupId, attempts }, context) {
        const task = await models.Task.create({ 
            ...input, groupId, attempts: JSON.stringify(attempts)
        })
        const group = await models.Group.findById(groupId)
        return group.addTask(task.id).then(() => task)
    },

    updateTask(root, { id, input }, context) {
        return models.Task.findById(id)
        .then(task => {
            return task.update(input)
        })
    },

    setResult(root, { id, res, userId }, context) {
        let resultId
        return models.Task.findById(id)
            .then(task => models.Result.create(res)
                .then(result => {   
                    resultId = result.id
                    result.setUser(userId)
                    models.User.findById(userId)
                        .then(user => user.update({ 
                            name: user.name, username: user.username, 
                            password: user.password, email: user.email, 
                            avatarUrl: user.avatarUrl, wordsLearnt: (user.wordsLearnt + result.wordsLearnt)
                        }))
                    return task.addResult(result.id)
                })).then(added => models.Result.findById(resultId))
    },

    updateResult(root, { id, resultId, res, userId }, context) {
        return models.Result.findById(resultId).then(result => result.update(res)
            .then(() => {
                models.User.findById(userId)
                    .then(user => user.update({
                        name: user.name, username: user.username,
                        password: user.password, email: user.email,
                        avatarUrl: user.avatarUrl, wordsLearnt: (user.wordsLearnt + result.wordsLearnt)
                    }))
                return models.Result.findById(resultId)
            }))
    },

    removeTask(root, { id }, context) {
        return models.Task.findById(id)
            .then(task => task.destroy())
    },
}