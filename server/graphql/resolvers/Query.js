const Sequelize = require('sequelize')
const { models } = require('../../models')
const { getUserId } = require('../../utils')
const Op = Sequelize.Op

module.exports = {
async group (root, { token, id }) {
  const userId = await getUserId(token)
  const group = await models.Group.findById(id)
  let valid = false
  group.users.map(user => {
    if (user.id == userId)
      valid = true
  })
  if (!valid)
    return { error: 'Вы не состоите в данной группе' }
  return { group }
},
  groups(root, {}, context) {
    return models.Group.findAll({}, context)
  },
async user (root, { token }) {
  const userId = await getUserId(token)
  return models.User.findById(userId)
},
async suitableUsers(root, { token, query }, context) {
  const userId = await getUserId(token)
  const validUser = await models.User.findById(userId)
  if(validUser) {
    const users = await models.User.findAll({
      where: {
        [Op.or]: [{ username: { [Op.like]: `%${query}%` } }, { name: { [Op.like]: `%${query}%` } }]
      }
    })
    return users
  }
  return null
},
async task (root, { token, id, groupId }) {
  const userId = await getUserId(token)
  const group = await models.Group.findById(groupId)
  let valid = false
  group.users.map(user => {
    if (user.id === userId)
      valid = true
  })
  if (!valid)
    return { error: 'Вы не состоите в данной группе' }
  group.tasks.map(task => {
    if (task.id === id)
      valid = true
  })
  if (!valid)
    return { error: 'Этого задания нет в данной группе' }
  const task = await models.Task.findById(id)
  return { task }
},
}
