const { models } = require('../../models')

module.exports = {
group (root, { id }) {
    return models.Group.findById(id)
  },
  group (root, args, context) {
    return models.Group.findAll({}, context)
  },
user (root, { id }) {
    return models.User.findById(id)
  },
  users (root, args, context) {
    return models.User.findAll({}, context)
  },
task (root, { id }) {
    return models.Task.findById(id)
  },
  tasks (root, args, context) {
    return models.Task.findAll({}, context)
  }
}
