import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import app from '../modules/app.module'
import messages from '../modules/message.module'
import users from '../modules/user.module'
import projects from '../modules/project.module'
import {createForms} from "react-redux-form";
import {InitialLogin, InitialRegister} from "../modules/form.module";

const analytics = () => (next) => (action) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  })
  return next(action)
}

// Redux store config
const configureStore = (initialState = {}) => {
  const reducers = combineReducers({
    app,
    messages,
    users,
    projects,
    ...createForms({ login: InitialLogin, register: InitialRegister }),
  })

  // Middleware and store enhancers
  const middlewares = [
    thunk,
    process.env.NODE_ENV !== 'production' && logger,
    analytics,
  ].filter(Boolean)
  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(reducers, initialState, enhancer)

  return store
}

const store = configureStore()

export default store
