import {auth, db} from '../../api/firebase'
import {authActions, AuthActionsType} from '../actions/auth-actions'
import {appActions} from '../actions/app-actions'
import {BaseThunkType} from '../redux-store'
import {ActionsTypes, productsActions} from '../actions/products-actions'
import {FullProductType} from '../../types/types'

export const fetchProducts = (limit: number): ThunkType => async (dispatch: any) => {
    let products
    db
        .collection('products')
        .limit(limit)
        .get()
        .then(p => {
            products = p.docs.map(doc => (doc.data()))
            dispatch(productsActions.setProducts(products as FullProductType[]))
        })
}

export const fetchProductById = (id: number): ThunkType => async (dispatch: any) => {
    let products
    db
        .collection('products')
        .where('id', '==', id)
        .limit(1)
        .get()
        .then(p => {
            products = p.docs.map(doc => (doc.data()))
            dispatch(productsActions.setProducts(products as FullProductType[]))
        })
}

export type ThunkType = BaseThunkType<ActionsTypes>