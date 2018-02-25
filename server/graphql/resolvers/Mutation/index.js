const { models } = require('../../../models')
const auth = require('./auth')
const group = require('./group')
const task = require('./task')
const user = require('./user')

module.exports = {
  ...auth, ...group, ...task, ...user
}
