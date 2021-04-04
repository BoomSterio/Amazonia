import { ActionsTypes } from '../actions/products-actions'
import { FullProductType } from '../../types/types'

let initialState = {
  products: [] as FullProductType[],
}

export type InitialStateType = typeof initialState

const productsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'products/SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      }
    case 'products/ADD_PRODUCTS':
      let merged = [...state.products, ...action.newProducts]
      merged = Array.from(merged.reduce((a, o) => a.set(o.id, o), new Map()).values())

      return {
        ...state,
        products: merged,
      }

    default:
      return state
  }
}

export default productsReducer
