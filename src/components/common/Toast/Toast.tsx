import React from 'react'
import styles from './Toast.module.css'
import {toast, ToastContainer} from 'react-toastify'


type Props = {
    title: string,
    image: string,
}

export const createToast = (title: string, image: string) => {
    toast.configure()
    toast(<Toast title={title} image={image}/>, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        className: styles.container,
        progressClassName: 'Toastify__progress-bar--dark'
    })
}

const Toast: React.FC<Props> = ({title, image}) => {
    return (
        <div className={styles.toast}>
            <img className={styles.image} src={image} alt={'toast'}/>
            <h4>{title}</h4>
        </div>
    )
}

export default Toast