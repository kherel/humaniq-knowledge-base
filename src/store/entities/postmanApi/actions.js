import { createRequestActions } from 'helpers'
import { POSTMAN_API } from 'store/constants'
import { BACKEND_CALL } from '../../middleware/humaniqBackendApi'
import { POSTMAN_ENDPOINT } from 'constants/api'

export function fetchPostmanApi () {
  return ({
    [BACKEND_CALL]: {
      endpoint: POSTMAN_ENDPOINT,
      method: 'GET',
      types: createRequestActions(POSTMAN_API),
    }
  })
}