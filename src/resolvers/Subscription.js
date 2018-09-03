const { clearLog } = require('../utils')
const { 
  PUBSUB_NEW_SNIPPIT, PUBSUB_TEST_ALPHA 
} = require('../constants')

const Subscription = {
  snippit: {
    subscribe: (parent, args, { pubsub }) => {
      clearLog('hello SUBSCRIPTION', 'sub sub sub')
      return pubsub.asyncIterator(PUBSUB_NEW_SNIPPIT)     
    },
  }, 
  ttest: {
    subscribe: (parent, args, { pubsub }) => {
      clearLog('hello T-TEST', 't-test sub')
      return pubsub.asyncIterator(PUBSUB_TEST_ALPHA)     
    },
  }   
}

module.exports = { Subscription }




// const { PubSub } = require('graphql-subscriptions')
// const pubsub = new PubSub()
// const payload = {
//   commentAdded: {
//     id: '1', 
//     content: 'Hello Sub'
//   }
// }
// pubsub.publish('commentAdded', payload)


// I DON'T THINK THIS WILL HELP ME ANYMORE/ IT'S DEPRECIATED
//
// feedSubscription: {
//   subscribe: (parent, args, ctx, info) => {
//     return ctx.db.subscription.post(
//       {
//         where: {
//           node: {
//             isPublished: true,
//           },
//         },
//       },
//       info,
//     )
//   },
// },