const GraphQLDate = require('graphql-date')

const query = require('./query')
const mutation = require('./Mutation')

module.exports = function resolvers() {
  return {
    Query: query,

    Mutation: mutation,

    User: {
      groups(user) {
        return user.getGroups()
      }
    },

    Group: {
      tasks(group) {
        return group.getTasks()
      },
      users(group) {
        return group.getUsers()
      },
    },

    Task: {
      results(task) {
        return task.getResults()
      },
      words(task) {
        return task.getWordPairs()
      }
    },

    Date: GraphQLDate
  }
}
