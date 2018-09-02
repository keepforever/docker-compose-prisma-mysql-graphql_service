const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis);

const client = redis.createClient()

// FYI
// HTTP:  http://localhost:4466
//   WS:    ws://localhost:4466

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  // "http://localhost:4466" used for endpoint when server is not docker-compose up'd
  // "http://prisma:4466" if server is docker-composed up
  //endpoint: "http://prisma:4466",
  endpoint: "http://prisma:4466", // "http://prisma:4466" the endpoint of the Prisma API (value set in `.env`)
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  secret: "mysecret123", // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db, client }),
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
