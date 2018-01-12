import mongoose from 'mongoose'

const schema = new mongoose.Schema({

  value: Object,

}, {
  timestamps: true,
})

schema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
    return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  })
}

mongoose.model('Postman', schema)
