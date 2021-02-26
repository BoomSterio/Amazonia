import React from 'react'
import styles from './Toast.module.css'
import {toast, ToastContainer} from 'react-toastify'


type Props = {
    title: string,
    image: string,
    quantity: number
}

export const createToast = (title: string, image: string, quantity: number) => {
    toast.configure()
    toast(<Toast title={title} image={image} quantity={quantity}/>, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        className: styles.container,
        progressClassName: 'Toastify__progress-bar--dark'
    })
}

const Toast: React.FC<Props> = ({title, image, quantity}) => {
    return (
        <div className={styles.toast}>
            <img className={styles.image} src={image} alt={'toast'}/>
            <div className={styles.info}>
                <h4>{title}</h4>
                <small>X{quantity}</small>
                {/*<small>Click to close</small>*/}
            </div>
        </div>
    )
}

export default Toast