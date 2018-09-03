const { auth } = require('./Mutation/auth')
const { snippit } = require('./Mutation/snippit')
const { user } = require('./Mutation/user')

const { AuthPayload } = require('./AuthPayload')
const { Query } = require('./Query')

const { Subscription } = require('./Subscription')

module.exports = {
  Query,
  Subscription,
  Mutation: {
    ...auth,
    ...snippit,
    ...user,
  },
  AuthPayload,
}
