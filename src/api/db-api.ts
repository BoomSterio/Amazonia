import {db} from './firebase'
import {CartProductType, DeliveryType} from '../types/types'

export const dbAPI = {
    submitOrder: (userId: string, paymentIntent: any, cart: CartProductType[], delivery: DeliveryType) => {
        return db
            .collection('users')
            .doc(userId)
            .collection('orders')
            .doc(paymentIntent?.id)
            .set({
                cart: cart,
                delivery: delivery,
                amount: paymentIntent?.amount,
                created: paymentIntent?.created,
                status: 'In Processing'
            })
    },
    getUserOrders: (userId: string) => {
        let orders
        orders = db
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
    }
}