const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { models } = require('../../../models')
const Group = require('./group')
const { secret } = require('../../../utils/index')

const auth = {
  async signup(root, { email, name, username, password, }, context) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const returnObject = {}
    const user = await models.User.create({ email, name, username, password: hashedPassword, avatarUrl: '' }).then(user => {
      returnObject.user = user
      returnObject.token = jwt.sign({ userId: user.id }, secret())
      return models.Group.create({ name: 'Личная группа', superUsers: JSON.stringify([user.id]) })
        .then(group => group.setUsers([user.id])
          .then(() => {
            return user.setGroups([group.id])
          }))
    })

    return returnObject
  },

  async login(parent, { username, password }, info) {
    const user = await models.User.findOne({ where: { username } })
    if (!user) {
      throw new Error('Пользователя с таким логином не существует')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Неверный пароль')
    }
    
    return {
      token: jwt.sign({ userId: user.id }, secret()),
      user,
    }
  },
}

module.exports = auth