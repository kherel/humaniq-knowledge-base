import dotenv from 'dotenv'

dotenv.config()

export default {

  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.PORT || 3000,

  dbUrl: process.env.DB_URL,
}
