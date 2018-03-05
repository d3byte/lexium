const { models } = require('../../models')
const { getUserId } = require('../../utils')

module.exports = {
group (root, { id }) {
    return models.Group.findById(id)
  },
  group (root, args, context) {
    return models.Group.findAll({}, context)
  },
async user (root, { token }) {
  const userId = await getUserId(token)
  console.log(userId)
  return models.User.findById(userId)
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
