const request = require('superagent')
const { compact } = require('lodash/array')
const POSTMAN_END_POINT = 'https://api.getpostman.com/collections/'
const POSTMAN_API_KEY = 'db1c85209ca94753b39690cb42d2d9af'

function fetchPostmanApi(req, res) {

  request
    .get(POSTMAN_END_POINT)
    .set('X-Api-Key', POSTMAN_API_KEY)
    .end(function(err, response) {
      let {collections} = response.body
      collections = collections.filter(({name}) => name !== 'tapatybe' && name !== 'tapatybe-new')
      const promises = collections.map(({name, uid}) => {
        return(
          request
            .get(POSTMAN_END_POINT + uid)
            .set('X-Api-Key', POSTMAN_API_KEY)
        )

      })

      Promise
        .all(promises)
        .then( arr => {
          const collections = {}
          arr.forEach((data, i) => {

            const {collection} = data.body
            collections[collection.info.name] = collection
          })
          res.json({collections}).status(200)
        }, reason => {
          console.log(reason)
        })
    })

}

module.exports = fetchPostmanApi
