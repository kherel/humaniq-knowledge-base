import {createStore, applyMiddleware} from 'redux';
import reducer from 'rootReducer'
import error from './middleware/error'
import humaniqBackendApi from './middleware/humaniqBackendApi'

const enhancer = applyMiddleware(humaniqBackendApi, error)

const store = (initialState = {}) => createStore(reducer, initialState, enhancer)

export default store
