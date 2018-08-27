const { forwardTo } = require('prisma-binding')
const { getUserId } = require('../utils')

const Query = {
  users: forwardTo("db"),
  snippits: forwardTo("db"),
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
  snippitsConnection: (parent, args, ctx, info) => {
    getUserId(ctx)
    return forwardTo("db")(parent, args, ctx, info);
  },
}

module.exports = { Query }
