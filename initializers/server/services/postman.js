import { Postman } from "initializers/server/config/initialize/mongoose"
import fetchPostmanApi from "initializers/server/utils/postmanApi"

export default async () => {
  try {
    let value = await fetchPostmanApi()
    let object = await Postman.findOneOrCreate()

    await object.set({ value })
    await object.save()
  } catch (err) {
    console.log(err.stack)
  }
}
