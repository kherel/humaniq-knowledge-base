import schedule from 'node-schedule'
import { connectDb, closeDb } from "initializers/server/config/initialize/mongoose"
import postmanService from "initializers/server/services/postman"

schedule.scheduleJob('1 * * * *', async () => { await run() })

const run = async () => {
  console.log("start", new Date())

  await connectDb()

  await postmanService()

  await closeDb()

  console.log("end", new Date())
}

run()
