module.exports = `
scalar Date

type Query {
  task(token: String!, id: ID!, groupId: ID!): QueryPayload!
  group(token: String!, id: ID!): QueryPayload!
  user(token: String!): User
  suitableUsers(token: String!, query: String!, groupId: ID!): [User]
  groups: [Group]
}

type Mutation {
  createGroup(name: String!, usersIds: [ID!]!, superUsers: [ID!]!): Group
  updateGroup(id: ID!, input: GroupInput): Group
  updateGroupAvatar(token: String!, avatarUrl: String!, id: ID!): Group
  addUserToGroup(id: ID!, userId: ID!): Group
  addUsersToGroup(token: String!, id: ID!, users: [ID!]!): Group
  removeUserFromGroup(token: String!, id: ID!): ValidPayload!
  removeGroup(id: ID!): ValidPayload!

  createTask(input: TaskInput!, groupId: ID!, attempts: Attempts!): Task
  updateTask(id: ID!, input: TaskInput!): Task
  setResult(id: ID!, res: ResultInput!, userId: ID!): Result
  updateResult(id: ID!, resultId: ID!, res: ResultInput!, userId: ID!): Result
  removeTask(id: ID!): Task

  updateUser(id: ID!, input: UserInput!): User
  updateUserAvatar(token: String!, avatarUrl: String!): User
  verifyPassword(userId: ID!, password: String!): ValidPayload!
  changePassword(userId: ID!, password: String!): User
  removeUser(id: ID!): User
  checkEmail(email: String!): ValidPayload!
  checkUsername(username: String!): ValidPayload!
  signup(email: String!, password: String!, name: String!, username: String!): AuthPayload!
  login(username: String!, password: String!): AuthPayload!
}

type QueryPayload {
  group: Group
  task: Task
  error: String
}

type AuthPayload {
  token: String
  user: User
  error: String
}

type ValidPayload {
  valid: Boolean
  error: String
}

type Group {
  id: ID!
  name: String!
  users: [User!]
  superUsers: String!
  tasks: [Task]
  avatarUrl: String!
  isPersonal: Boolean!
  createdAt: Date!
}

input GroupInput {
  name: String!
  superUsers: [ID!]!
}

type User {
  id: ID!
  email: String!
  username: String!
  name: String!
  password: String!
  wordsLearnt: Int!
  groups: [Group!]!
  avatarUrl: String!
  createdAt: Date!
}

input UserInput {
  name: String!
  username: String!
  email: String!
  avatarUrl: String!
}

type Task {
  id: ID!
  groupId: ID!
  name: String!
  words: String!
  results: [Result]
  attempts: String!
  deadline: Date!
  createdAt: Date!
}

input TaskInput {
  name: String!
  deadline: Date
  words: String!
}

input Attempts {
  learnWords: Int!
  findPair: Int!
  typeIn: Int!
  scramble: Int!
}

type WordPair {
  id: ID!
  key: String!
  value: String!
}

input WordPairInput {
  id: ID!
  key: String!
  value: String!
}

type Result {
  id: ID!
  user: User!
  wordsLearnt: Int!
  percentage: Int!
  createdAt: Date!
}

input ResultInput {
  wordsLearnt: Int!
  percentage: Int!
}

union SearchResult = User | Group | Task | Result | WordPair

schema {
  query: Query
  mutation: Mutation
}
`
