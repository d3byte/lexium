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
  task(taskId: ID!): Task!
  tasks(groupId: ID!): [Task!]
  groups: [Group!]
  group: Group!
  user: User!
  users: [User!]!
}

type Mutation {
  createGroup(name: String!, usersIds: [ID!]!, superUsers: [ID!]!): Group
  updateGroup(id: ID!, input: GroupInput): Group
  addUserToGroup(id: ID!, userId: ID!): Group
  removeUserFromGroup(id: ID!, userId: ID!): Group
  removeGroup(id: ID!): Group

  createTask(input: TaskInput!, wordPairs: [WordPairInput!]!): Task
  updateTask(id: ID!, input: TaskInput!): Task
  setNewWordPair(id: ID!, wordPair: WordPairInput!): Task
  removeWordPair(id: ID!, wordPairId: ID!): Task
  setResult(id: ID!, res: ResultInput!): Task
  updateResult(id: ID!, result: ResultInput!): Task
  removeTask(id: ID!): Task

  updateUser(id: ID!, input: UserInput!): User
  removeUser(id: ID!): User
  signup(email: String!, password: String!, name: String!, username: String!): AuthPayload!
  login(username: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}

type Group {
  id: ID!
  name: String!
  users: [User!]
  superUsers: String!
  tasks: [Task]
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
  password: Int!
  email: String!
  avatarUrl: String!
}

type Task {
  id: ID!
  groupId: ID!
  name: String!
  words: [WordPair!]!
  results: [Result!]!
  deadline: Date!
  createdAt: Date!
}

input TaskInput {
  name: String!
  deadline: Date!
}

type WordPair {
  word: String!
  translation: String!
}

input WordPairInput {
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
