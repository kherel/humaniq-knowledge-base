import schedule from 'node-schedule'
import { connectDb, closeDb } from "initializers/server/config/initialize/mongoose"
import postmanService from "initializers/server/services/postman"

// const time = { hour: 12, minute: 30 }

// schedule.scheduleJob(time, async () => { await run() })

const run = async () => {
  console.log("start", new Date())

  await connectDb()

  await postmanService()

  await closeDb()

  console.log("end", new Date())
}

run()
