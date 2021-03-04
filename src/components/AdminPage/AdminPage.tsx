import React from 'react'
import styles from './AdminPage.module.css'
import {useSelector} from 'react-redux'
import {getAuthUser} from '../../redux/selectors/auth-selectors'
import {Redirect} from 'react-router'
import {Input} from '@material-ui/core'
import NewProductForm from './NewProductForm/NewProductForm'

const AdminPage: React.FC = () => {
    const user = useSelector(getAuthUser)

    if(user.email !== 'admin@gmail.com')
        return <Redirect to={'/'}/>

    return (
        <div className={styles.admin}>
            <div className={styles.container}>
                <NewProductForm/>
                <NewProductForm/>
            </div>
        </div>
    )
}

export default AdminPage
