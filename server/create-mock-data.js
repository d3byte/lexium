const { models, sequelize } = require('./models')

function createData () {
  let groupsPromise = models.Group.bulkCreate([
    {
      name: 'Лежать+сосать',
    },
    {
      name: 'Кто это тут сосёт?',
    }
  ])

  // const HOUR = 60 * 60 * 1000
  // let now = new Date()
  // let oneHourLater = new Date(now.getTime() + HOUR)
  // let twoHoursLater = new Date(oneHourLater.getTime() + HOUR)
  // let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR)

  Promise.all([usersPromise])
    .then(() => Promise.all([
      models.Group.findAll()
    ]))
    .then(function ([groups]) {
      let promises = []
      promises.push(groups)
      // promises.push(events[0].setRoom(rooms[0]))
      // promises.push(events[1].setRoom(rooms[1]))
      // promises.push(events[2].setRoom(rooms[2]))

      // promises.push(events[0].setUsers([users[0], users[1]]))
      // promises.push(events[1].setUsers([users[1], users[2]]))
      // promises.push(events[2].setUsers([users[0], users[2]]))

      return Promise.all(promises)
    })
}

sequelize.sync()
  .then(createData)
