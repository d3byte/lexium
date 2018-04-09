const { models, sequelize } = require('./models')

// function createData () {
//   Promise.all([groupsPromise])
//     .then(() => Promise.all([
//       models.Group.findAll()
//     ]))
//     .then(function ([groups]) {
//       let promises = []
//       promises.push(groups)
//       promises.push(events[0].setRoom(rooms[0]))
//       promises.push(events[1].setRoom(rooms[1]))
//       promises.push(events[2].setRoom(rooms[2]))

//       promises.push(events[0].setUsers([users[0], users[1]]))
//       promises.push(events[1].setUsers([users[1], users[2]]))
//       promises.push(events[2].setUsers([users[0], users[2]]))

//       return Promise.all(promises)
//     })
// }

sequelize.sync()
  // .then(createData)
