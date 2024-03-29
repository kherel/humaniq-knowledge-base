import fs from 'fs'
import request from 'superagent'
import { compact } from 'lodash/array'

const path = "initializers/server/postman.json"

export const write = async () => {
  try {
    let value = await fetchPostmanApi()

    await new Promise((res, rej) => {
      fs.writeFile(path, JSON.stringify(value), (err) => {
        if (err) rej(err)
        else res()
      })
    })

  } catch (err) {
    console.log(err.stack)
  }
}

export const read = async () => {
  let res = await new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err)
      else res(JSON.parse(data))
    })
  })

  return res
}

export const fetchPostmanApi = async () => {
  const POSTMAN_END_POINT = 'https://api.getpostman.com/collections/'
  const POSTMAN_API_KEY = 'db1c85209ca94753b39690cb42d2d9af'

  let res = await request
    .get(POSTMAN_END_POINT)
    .set('X-Api-Key', POSTMAN_API_KEY)

  let { collections } = res.body

  collections  = collections.filter(({ name }) => {
    return name !== 'tapatybe' && name !== 'tapatybe-new'
  })

  let arr = await Promise.all(
    collections.map(({ name, uid }) => {
      return(
        request
          .get(POSTMAN_END_POINT + uid)
          .set('X-Api-Key', POSTMAN_API_KEY)
      )
    })
  )

  const result = {}

  arr.forEach((data, i) => {
    const { collection } = data.body
    result[collection.info.name] = collection
  })

  return result
}
