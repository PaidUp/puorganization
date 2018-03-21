import _ from 'lodash'
import develop from './develop'
import production from './production'
import test from './test'
import stage from './stage'

const mongoHost = 'pu-dev-shard-00-00-4nodg.mongodb.net:27017,pu-dev-shard-00-01-4nodg.mongodb.net:27017,pu-dev-shard-00-02-4nodg.mongodb.net:27017'

const envs = {
  develop,
  production,
  stage,
  test
}

// All configurations will extend these options
// ============================================
let all = {
  port: process.env.PORT || 9002,
  mongo: {
    uri: 'mongodb://' + mongoHost + '/develop',
    prefix: 'pu_organization_',
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
  },
  auth: {
    credential: 'puproduct-secret',
    host: 'redis-13835.c16.us-east-1-3.ec2.cloud.redislabs.com',
    port: 13835,
    key: 'JF06f7FJjTDkNOcM1sdywWw5CZBHW4Jy'
  },
  logger: {
    projectId: 'gothic-talent-192920',
    logName: 'pu-product-dev-log',
    metadata: {resource: {type: 'global'}}
  },
  encryptKey: 'PZ3oXv2v6Pq5HAPFI9NFbQ==',
  collectFees: {
    fee: 5,
    feeFlat: 0
  },
  processingFees: {
    cardFee: 2.9,
    cardFeeFlat: 3,
    achFee: 0.8,
    achFeeFlat: 0,
    achFeeCap: 5
  },
  api: {
    payment: {
      url: 'http://localhost:9004/api/v1/payment'
    }
  },
  s3: {
    organization: {
      logo: {
        bucket: 'pu-media-dev',
        directory: 'organization/logo',
        setOriginalName: true,
        isPublic: true
      }
    }
  }
}

if (process.env.NODE_ENV) {
  all = _.merge(
    all,
    envs[process.env.NODE_ENV] || {})
}

// Export the config object based on the NODE_ENV
// ==============================================
export default all
