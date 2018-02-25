const { models } = require('../../../models')

module.exports = {
    // User
    createTask(root, { input, wordPairs }, context) {
        return models.Task.create(input).then(task => {
            let ids = []
            wordPairs.map(pair => models.WordPair.create(pair).then(created => ids.push(created.id)))
            return task.setWordPairs(ids)
        })
    },

    updateTask(root, { id, input }, context) {
        return models.Task.findById(id)
            .then(task => {
                return task.update(input)
            })
    },

    setNewWordPair(root, { id, wordPair }, context) {
        return models.Task.findById(id).then(task => {
            if (wordPair.id !== undefined) {
                return models.WordPair.findById(wordPair.id)
                    .then(pair => pair.update(wordPair)) 
            } else {
                const newWordPair = models.WordPair.create(wordPair).then(pair => pair)
                return task.addWordPair(newWordPair.id)
            }
        })
    },

    removeWordPair(root, { id, wordPairId }, context) {
        return models.Task.findById(id).then(task => task.removeWordPair(wordPairId))
    },

    setResult(root, { id, res }, context) {
        return models.Task.findById(id).then(task => {
            const newResult = models.Result.create(res).then(result => result)
            return task.addResult(newResult.id)
        })
    },

    updateResult(root, { id, result }, context) {
        return models.Result.findById(resId).then(res => res.update(result)
        .then(() => models.Task.findById(id).then(task => task)))
    },

    removeTask(root, { id }, context) {
        return models.Task.findById(id)
            .then(task => task.destroy())
    },
}