import {createStore as reduxCreateStore} from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from 'store/rootReducer';


// import createLogger from 'redux-logger';

let store

const createStore = (initialState = {}) => {
  if (!store) {
    store = reduxCreateStore(
      reducer,
      initialState,
    )
  }

  if (module.hot) {
    module.hot.accept('./', () => {
      const nextRootReducer = require('./rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default createStore
