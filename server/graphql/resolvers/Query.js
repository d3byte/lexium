const { models } = require('../../models')
const { getUserId } = require('../../utils')

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
