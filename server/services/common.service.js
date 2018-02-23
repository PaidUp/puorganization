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
    return this.model.save(entity).then(entity => entity)
  }

  updateById (id, values) {
    return this.model.updateById(id, values).then(entity => entity)
  }

  getById (entityId) {
    return this.model.findById(entityId).then(entity => entity)
  }

  find (filter) {
    return this.model.find(filter).then(entities => entities)
  }

  findOneAndUpdate (conditions, update, options) {
    return this.model.findOneAndUpdate(conditions, update, options).then(entities => {
      return entities
    })
  }

  getByIdAndFilter (id, values) {
    values._id = new ObjectId(id)
    return this.model.findOne(values).then(entity => entity)
  }
}
