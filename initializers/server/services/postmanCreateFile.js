import { write } from "initializers/server/services/postman"

const run = async () => {
  console.log("write postman response in json")
  await write()
  process.exit()
}

run()
