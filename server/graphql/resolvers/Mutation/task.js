const { models } = require('../../../models')

module.exports = {
    // User
    createTask(root, { input, words }, context) {
        words = words.map((pair, index) => {
            pair.id = index.toString()
            return pair
        })
        return models.Task.create({ ...input, words: JSON.stringify(words) })
    },

    updateTask(root, { id, input }, context) {
        return models.Task.findById(id)
            .then(task => {
                return task.update(input)
            })
    },

    updateTaskWordPairs(root, { id, words }, context) {
        return models.Task.findById(id)
            .then(task => task.update({ words: JSON.stringify(words) }))
    },

    setResult(root, { id, res, userId }, context) {
        return models.Task.findById(id)
            .then(task => models.Result.create(res)
                .then(result => {   
                    result.setUser(userId)
                    models.User.findById(userId)
                        .then(user => user.update({ 
                            name: user.name, username: user.username, 
                            password: user.password, email: user.email, 
                            avatarUrl: user.avatarUrl, wordsLearnt: (user.wordsLearnt + result.wordsLearnt)
                        }))
                    return task.addResult(result.id)
                })).then(added => models.Task.findById(id))
    },

    updateResult(root, { id, taskId, result, userId }, context) {
        return models.Result.findById(id).then(res => res.update(result)
            .then(() => {
                models.User.findById(userId)
                    .then(user => user.update({
                        name: user.name, username: user.username,
                        password: user.password, email: user.email,
                        avatarUrl: user.avatarUrl, wordsLearnt: (user.wordsLearnt + result.wordsLearnt)
                    }))
                return models.Task.findById(taskId)
            }))
    },

    removeTask(root, { id }, context) {
        return models.Task.findById(id)
            .then(task => task.destroy())
    },
}