import React from 'react'
import styles from './LoginPage.module.css'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {Alert} from '@material-ui/lab'
import {authAPI} from '../../api/auth-api'
import {useSelector} from 'react-redux'
import {getIsAuth} from '../../redux/selectors/auth-selectors'

interface State {
    email: string;
    password: string;
    showPassword: boolean;
    error: string | null
}

const LoginPage: React.FC = () => {
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        showPassword: false,
        error: null
    })

    const isAuth = useSelector(getIsAuth)

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const clearError = () => {
        setValues({...values, error: null})
    }

    const {email, password} = values

    const submitSignIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        authAPI.signInUser(email, password)
            .catch((error) => setValues({...values, error: error.message}))
    }

    const submitRegister = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        authAPI.registerUser(email, password)
            .catch((error) => setValues({...values, error: error.message}))
    }

    if(isAuth)
        return <Redirect to={'/'}/>

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <Link to={'/'}>
                    <img className={styles.logo} src={'http://pngimg.com/uploads/amazon/amazon_PNG6.png'} alt={'logo'}/>
                </Link>
                <div className={styles.window}>
                    <h1>Sign-In</h1>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="outlined-adornment-email"
                                    style={{paddingLeft: '16px'}}>E-mail</InputLabel>
                        <OutlinedInput
                            className={styles.input}
                            id="outlined-adornment-email"
                            autoComplete={'email'}
                            type={'text'}
                            value={values.email}
                            onChange={handleChange('email')}
                            labelWidth={42}
                        />
                    </FormControl>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="outlined-adornment-password"
                                    style={{paddingLeft: '16px'}}>Password</InputLabel>
                        <OutlinedInput
                            className={styles.input}
                            id="outlined-adornment-password"
                            autoComplete={'password'}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            labelWidth={68}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <button className={styles.submit} onClick={submitSignIn}>Sign In</button>
                    <Snackbar open={values.error !== null} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                              autoHideDuration={6000} onClose={clearError}>
                        <Alert onClose={clearError} severity="error">
                            {values.error}
                        </Alert>
                    </Snackbar>
                    <p>
                        By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                    </p>
                </div>
                <div className={styles.divider}>
                    <hr/>
                    <span>New to Amazon?</span>
                    <hr/>
                </div>
                <button className={styles.signupBtn} onClick={submitRegister}>Create your Amazon account</button>
            </div>
            <hr className={styles.pageEnd}/>
        </div>
    )
}

export default LoginPage