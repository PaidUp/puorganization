import mongoose from 'mongoose'
import config from '@/config/environment'

export default class CommonModel {
  constructor (name, document, schemaObj) {
    schemaObj['createOn'] = { type: Date, default: Date.now }
    schemaObj['updateOn'] = { type: Date, default: Date.now }
    this.schema = new mongoose.Schema(schemaObj)
    this.Model = mongoose.model(
      name,
      this.schema,
      config.mongo.prefix + document
    )
  }

  get bulk () {
    return this.Model.collection.initializeUnorderedBulkOp()
  }

  save (pp) {
    return new Promise((resolve, reject) => {
      try {
        let paymentPlan = new this.Model(pp)
        paymentPlan.save((err, data) => {
          if (err) {
            return reject(err)
          }
          return resolve(data)
        })
      } catch (error) {
        return reject(error)
      }
    })
  }

  find (filter) {
    return new Promise((resolve, reject) => {
      try {
        this.Model.find(filter, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  findOneAndUpdate (conditions, update, options) {
    return new Promise((resolve, reject) => {
      try {
        this.Model.findOneAndUpdate(conditions, update, options, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  findOne (filter) {
    return new Promise((resolve, reject) => {
      try {
        this.Model.findOne(filter, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  updateById (id, value) {
    return new Promise((resolve, reject) => {
      try {
        value['updateOn'] = Date.now()
        this.Model.findByIdAndUpdate(id, { $set: value }, { new: true }, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  findById (_id) {
    return this.Model.findById(_id).exec()
  }
}
