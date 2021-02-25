import {AppStateType} from '../redux-store'

export const getCheckoutState = (state: AppStateType) => {
    return state.checkout
}

export const getCart = (state: AppStateType) => {
    return getCheckoutState(state).cart
}

export const getCartCount = (state: AppStateType) => {
    return state.checkout.cart.reduce((count, {quantity}) => count + quantity, 0)
}

export const getCartTotal = (state: AppStateType) => {

    return state.checkout.cart.reduce((amount, item) => amount + item.price * item.quantity, 0)
}