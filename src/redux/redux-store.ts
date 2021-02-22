import {combineReducers, createStore} from 'redux'
import cartReducer from './reducers/cart-reducer'

let rootReducer = combineReducers({
    cart: cartReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>

let store = createStore(rootReducer)

// @ts-ignore
window.store = store

export default store

