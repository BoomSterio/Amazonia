import { CartProductType, DeliveryType } from '../../types/types'
import { CheckoutActionsType } from '../actions/checkout-actions'

let initialState = {
  cart: [] as CartProductType[],
}
export type InitialStateType = typeof initialState

const checkoutReducer = (state = initialState, action: CheckoutActionsType): InitialStateType => {
  switch (action.type) {
    case 'cart/ADD_TO_CART':
      if (state.cart.some(p => p.id === action.item.id)) {
        return {
          ...state,
          cart: [...state.cart.map(p => (p.id === action.item.id ? { ...p, quantity: p.quantity + action.item.quantity } : p))],
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, action.item],
        }
      }
    case 'cart/DELETE_FROM_CART':
      return {
        ...state,
        cart: [...state.cart.filter(p => p.id !== action.id)],
      }
    case 'cart/EMPTY_CART':
      return {
        ...state,
        cart: [],
      }
    case 'cart/CHANGE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: [...state.cart.map(p => (p.id === action.id ? { ...p, quantity: action.quantity } : p))],
      }

    default:
      return state
  }
}

export default checkoutReducer
