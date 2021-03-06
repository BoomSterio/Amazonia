import {ActionsTypes} from '../actions/products-actions'
import {FullProductType} from '../../types/types'

let initialState = {
    products: [] as FullProductType[]
}

export type InitialStateType = typeof initialState

const productsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'products/SET_PRODUCTS': {
            return {
                ...state,
                products: action.products
            }
        }

        default:
            return state
    }
}

export default productsReducer