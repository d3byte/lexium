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

    setNewWordPair(root, { id, wordPair }, context) {
        return models.Task.findById(id).then(task => {
            let words = JSON.parse(task.words)
            if (wordPair.id !== undefined) {
                words = words.map(pair => {
                    if (pair.id == wordPair.id) {
                        return wordPair
                    }
                    return pair
                })
            } else {
                wordPair.id = words.length
                words.push(wordPair)
            }
            task.words = JSON.stringify(words)
            return task.update({ name: task.name, deadline: task.deadline, words: task.words })
        })
    },

    removeWordPair(root, { id, wordPairId }, context) {
        return models.Task.findById(id).then(task => {
            let words = JSON.parse(task.words)
            words = words.filter(pair => pair.id != wordPairId)
            task.words = JSON.stringify(words)
            return task.update({ name: task.name, deadline: task.deadline, words: task.words })
        })
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