const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = function (sequelize) {
  const User = sequelize.define('User', {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    avatarUrl: Sequelize.STRING,
    wordsLearnt: Sequelize.BIGINT,
    password: Sequelize.STRING
  })

  User.prototype.validPassword = password => {
    console.log(this.password, password)
    return bcrypt.compare(password, this.password)
      .then(value => value)
      .catch(err => { throw new Error(err) })
  }

  const Group = sequelize.define('Group', {
    name: Sequelize.STRING,
    superUsers: Sequelize.STRING
  })

  const Task = sequelize.define('Task', {
    name: Sequelize.STRING,
    deadline: Sequelize.DATE
  })

  const Result = sequelize.define('Result', {
    wordsLearnt: Sequelize.MEDIUMINT,
    percentage: Sequelize.TINYINT
  })

  const WordPair = sequelize.define('WordPair', {
    word: Sequelize.STRING,
    translation: Sequelize.STRING
  })

  Task.belongsTo(Group)
  Task.belongsToMany(Result, { through: 'Tasks_Results' })
  Task.belongsToMany(WordPair, { through: 'Tasks_WordPairs', as: 'wordPairs' })
  Group.belongsToMany(User, { through: 'Groups_Users' })
  User.belongsToMany(Group, { through: 'Users_Groups' })

  return {
    User, Group, Task, WordPair, Result
  }
}
