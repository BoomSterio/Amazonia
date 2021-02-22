import {CartProductType} from '../../types/types'
import {CartActionsType} from '../actions/cart-actions'

let initialState = {
    cart: [] as CartProductType[]
}
export type InitialStateType = typeof initialState;

const cartReducer = (state = initialState, action: CartActionsType): InitialStateType => {
    switch (action.type) {
        case 'cart/ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item]
            }
        case 'cart/DELETE_FROM_CART':
            return {
                ...state,
                cart: [...state.cart]
            }

        default:
            return state
    }
}

export default cartReducer