const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    avatarUrl: Sequelize.STRING,
    wordsLearnt: { type: Sequelize.BIGINT, defaultValue: 0 },
    password: Sequelize.STRING
  })

  User.prototype.validPassword = password => {
    return bcrypt.compare(password, this.password)
      .then(value => value)
      .catch(err => { throw new Error(err) })
  }

  const Group = sequelize.define('Group', {
    name: Sequelize.STRING,
    superUsers: Sequelize.STRING,
    avatarUrl: Sequelize.STRING,
  })

  const Task = sequelize.define('Task', {
    name: Sequelize.STRING,
    deadline: Sequelize.DATE,
    words: Sequelize.STRING
  })

  const Result = sequelize.define('Result', {
    wordsLearnt: Sequelize.MEDIUMINT,
    percentage: Sequelize.TINYINT
  })

  const WordPair = sequelize.define('WordPair', {
    word: Sequelize.STRING,
    translation: Sequelize.STRING
  })

  Task.belongsToMany(Result, { through: 'Tasks_Results' })
  Group.belongsToMany(User, { through: 'Groups_Users' })
  Group.belongsToMany(Task, { through: 'Groups_Task' })
  User.belongsToMany(Group, { through: 'Users_Groups' })
  Result.belongsTo(User)

  return {
    User, Group, Task, WordPair, Result
  }
}
