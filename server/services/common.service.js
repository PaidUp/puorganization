import { Types } from 'mongoose'
let ObjectId = Types.ObjectId

export default class CommonService {
  constructor (model) {
    this.model = model
  }

  get bulk () {
    return this.model.bulk
  }

  save (entity) {
    return this.model.save(entity)
  }

  updateById (id, values) {
    return this.model.updateById(id, values)
  }

  getById (entityId) {
    return this.model.findById(entityId)
  }

  find (filter) {
    return this.model.find(filter)
  }

  findOne (filter) {
    return this.model.findOne(filter)
  }

  findOneAndUpdate (conditions, update, options) {
    return this.model.findOneAndUpdate(conditions, update, options)
  }

  findByIdAndDelete (id) {
    return this.model.findByIdAndDelete(id)
  }

  getByIdAndFilter (id, values) {
    values._id = new ObjectId(id)
    return this.model.findOne(values)
  }
}
