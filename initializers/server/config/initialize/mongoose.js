import 'initializers/server/models'
import mongoose from 'mongoose'
import settings from 'initializers/server/config/settings'

mongoose.Promise = global.Promise
settings.isEnvTest ? null : mongoose.set('debug', true)

export const connectDb = async () => {
  await mongoose.connect(settings.dbUrl, { useMongoClient: true })
}

export const dropDb = async () => {
  await mongoose.connection.db.dropDatabase()
}

export const closeDb = async () => {
  await mongoose.connection.close
}

export const Postman = mongoose.model('Postman')

export default mongoose
