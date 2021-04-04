import { Action, combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import checkoutReducer from './reducers/checkout-reducer'
import authReducer from './reducers/auth-reducer'
import appReducer from './reducers/app-reducer'
import productsReducer from './reducers/products-reducer'

let rootReducer = combineReducers({
  checkout: checkoutReducer,
  auth: authReducer,
  app: appReducer,
  products: productsReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
window.store = store

export default store
