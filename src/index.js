const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

// FYI
// HTTP:  http://localhost:4466
//   WS:    ws://localhost:4466

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: "http://localhost:4466", // the endpoint of the Prisma API (value set in `.env`)
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  secret: "mysecret123", // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db }),
})
// middlewear for static files.
// must install express and import with 'require' syntax
// server.express.use("/images", express.static("images"));

server.start(() => console.log(`

##################################################
##                                              ##
##  Server is running on http://localhost:4000  ##
##                                              ##
##################################################

`))
