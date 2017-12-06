import {START, SUCCESS, REQUEST, FAIL, POSTMAN_API} from 'store/constants'
import mapper from './mapper'

const postmanApiInit = {
  loading: false,
  loaded: false,
  articles: [],
}

export default (postmanApi = postmanApiInit, { type, data }) => {

  switch (type) {
    case REQUEST + POSTMAN_API + START:
      return {...postmanApi, loading: true}
    case REQUEST + POSTMAN_API + SUCCESS:
      return {...postmanApi, loading: false, loaded: true, articles:[...mapper(data.collections)]}
    case REQUEST + POSTMAN_API + FAIL:
      return {...postmanApi, loading: false}
  }

  return postmanApi;
}