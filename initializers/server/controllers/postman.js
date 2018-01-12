import { Postman } from "initializers/server/config/initialize/mongoose"

export default {

  show: async (req, res, next) => {
    try {
      let object = await Postman.findOne()

      res.status(200).json(object.value)
    } catch(err) {
      return next(err)
    }
  },

}
