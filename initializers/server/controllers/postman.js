import { read } from "initializers/server/services/postman"

export default {

  show: async (req, res, next) => {
    try {
      let response = await read()

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
