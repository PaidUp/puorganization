// Development specific configuration
// ==================================
const mongoHost =
  process.env.TDUSER_MONGO_HOST || 'pu-dev-shard-00-00-4nodg.mongodb.net:27017,pu-dev-shard-00-01-4nodg.mongodb.net:27017,pu-dev-shard-00-02-4nodg.mongodb.net:27017'
module.exports = {
  port: process.env.PORT || 9008,
  mongo: {
    uri: 'mongodb://' + mongoHost + '/develop',
    prefix: 'pu_product_',
    options: {
      user: 'pudevelop',
      pass: 'xEbiMFBtX48ObFgC',
      ssl: true,
      replicaSet: 'pu-dev-shard-0',
      authSource: 'admin',
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 1000, // Reconnect every 500ms
      poolSize: 5 // Maintain up to 10 socket connections
    }
  }
}
