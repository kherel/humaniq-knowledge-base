import { Postman, connectDb, closeDb } from "initializers/server/config/initialize/mongoose"

export default {

  show: async (req, res, next) => {
    try {
      await connectDb()

      let object = await Postman.findOne()

      await closeDb()

      res.status(200).json(object.value)
    } catch(err) {
      return next(err)
    }
  },

}
