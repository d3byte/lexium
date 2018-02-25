const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { models } = require('../../../models')

const auth = {
  async signup(root, { email, name, username, password, }, context) {
    const password = await bcrypt.hash(password, 10)
    const user = await models.User.create({ email, name, username, password, avatarUrl: '' }).then(user => {
      let group = models.Group.create({ name: 'Личная группа' })
        .then(createdGroup => createdGroup)
      group.setUsers(user.id)
      group.setSuperUsers(user.id)
      return user.setGroups([group.id])
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { username, password }, info) {
    const user = await models.User.findOne({ where: { username } })
    if (!user) {
      throw new Error(`No such user found for email: ${username}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}

module.exports = auth