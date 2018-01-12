import schedule from 'node-schedule'
import { write } from "initializers/server/services/postman"

let rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 1);

schedule.scheduleJob(rule, async () => { await run() })

const run = async () => {
  console.log("start", new Date())

  await write()

  console.log("end", new Date())
}

