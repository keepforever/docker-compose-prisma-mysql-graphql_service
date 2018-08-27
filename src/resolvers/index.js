const { auth } = require('./Mutation/auth')
const { snippit } = require('./Mutation/snippit')
const { user } = require('./Mutation/user')

const { AuthPayload } = require('./AuthPayload')
const { Query } = require('./Query')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...snippit,
    ...user,
  },
  AuthPayload,
}
