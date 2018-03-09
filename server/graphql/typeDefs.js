// module.exports = `
// scalar Date

// type User {
//     id: ID!
//     login: String!
//     homeFloor: Int
//     avatarUrl: String!
// }

// input UserInput {
//     login: String!
//     homeFloor: Int
//     avatarUrl: String!
// }

// type UserRoom {
//     id: ID!
//     title: String!
// }

// type Room {
//     id: ID!
//     title: String!
//     capacity: Int!
//     floor: Int!
// }

// input RoomInput {
//     title: String!
//     capacity: Int!
//     floor: Int!
// }

// type Event {
//     id: ID!
//     title: String!
//     dateStart: Date!
//     dateEnd: Date!
//     users: [User]
//     room: Room
// }

// input EventInput {
//     title: String!
//     dateStart: Date!
//     dateEnd: Date!
// }

// type Query {
//   user(id: ID!): User
//   users: [User]
//   event(id: ID!): Event
//   events: [Event]
//   room(id: ID!): Room
//   rooms: [Room]
// }

// type Mutation {
//   createUser(input: UserInput!): User
//   updateUser(id: ID!, input: UserInput!): User
//   removeUser(id: ID!): User

//   createRoom(input: RoomInput!): Room
//   updateRoom(id: ID!, input: RoomInput!): Room
//   removeRoom(id: ID!): Room

//   createEvent(input: EventInput!, usersIds: [ID], roomId: ID!): Event
//   updateEvent(id: ID!, input: EventInput!): Event
//   removeUserFromEvent(id: ID!, userId: ID!): Event
//   addUserToEvent(id: ID!, userId: ID!): Event
//   changeEventRoom(id: ID!, roomId: ID!): Event
//   removeEvent(id: ID!): Event
// }

// union SearchResult = User | Event | Room

// schema {
//   query: Query
//   mutation: Mutation
// }
// `;

module.exports = `
scalar Date

type Query {
  task(token: String!, id: ID!, groupId: ID!): QueryPayload!
  group(token: String!, id: ID!): QueryPayload!
  user(token: String!): User
  groups: [Group]
}

type Mutation {
  createGroup(name: String!, usersIds: [ID!]!, superUsers: [ID!]!): Group
  updateGroup(id: ID!, input: GroupInput): Group
  addUserToGroup(id: ID!, userId: ID!): Group
  removeUserFromGroup(id: ID!, userId: ID!): Group
  removeGroup(id: ID!): Group

  createTask(input: TaskInput!, words: [WordPairInput!]!): Task
  updateTask(id: ID!, input: TaskInput!): Task
  setNewWordPair(id: ID!, wordPair: WordPairInput!): Task
  removeWordPair(id: ID!, wordPairId: ID!): Task
  setResult(id: ID!, res: ResultInput!, userId: ID!): Task
  updateResult(id: ID!, taskId: ID!, result: ResultInput!, userId: ID!): Task
  removeTask(id: ID!): Task

  updateUser(id: ID!, input: UserInput!): User
  verifyPassword(userId: ID!, password: String!): VerifyPayload!
  changePassword(userId: ID!, password: String!): User
  removeUser(id: ID!): User
  checkEmail(email: String!): VerifyPayload!
  checkUsername(username: String!): VerifyPayload!
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

type VerifyPayload {
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
  name: String!
  words: String!
  results: [Result!]!
  deadline: Date!
  createdAt: Date!
}

input TaskInput {
  name: String!
  deadline: Date!
}

type WordPair {
  id: ID!
  word: String!
  translation: String!
}

input WordPairInput {
  id: ID
  word: String!
  translation: String!
}

type Result {
  id: ID!
  user: User!
  wordsLearnt: Int!
  percentage: Int!
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
