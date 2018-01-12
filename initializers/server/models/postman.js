import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  value: Object,
}, {
  timestamps: true,
})

schema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
  let result

  result = await this.findOne(condition)

  if (!result) {
    result = new this()
  }

  return result
}

mongoose.model('Postman', schema)
