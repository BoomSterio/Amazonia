import {db} from './firebase'
import {CartProductType, DeliveryType, FullProductType} from '../types/types'
import firebase from 'firebase'

export const dbAPI = {
    submitOrder: (userId: string, paymentIntent: any, cart: CartProductType[], delivery: DeliveryType) => {
        return db
            .collection('users')
            .doc(userId)
            .set({
                orders: firebase.firestore.FieldValue.arrayUnion({
                    cart: cart,
                    delivery: delivery,
                    amount: paymentIntent?.amount,
                    created: paymentIntent?.created,
                    status: 'In Processing'
                })
            }, {merge: true})
            /*.collection('orders')
            .doc(paymentIntent?.id)
            .set({
                cart: cart,
                delivery: delivery,
                amount: paymentIntent?.amount,
                created: paymentIntent?.created,
                status: 'In Processing'
            })*/
    },
    getUserOrders: async (userId: string) => {
        let orders
        orders = await db
            .collection('users')
            .doc(userId)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot((snapshot: any) => (
                snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                        data: doc.data()
                }))))
        return orders
    },
    createProduct: (product: FullProductType) => {
        db
            .collection('products')
            .doc()
            .set(product)
    }
}