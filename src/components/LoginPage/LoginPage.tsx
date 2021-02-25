import React from 'react'
import styles from './LoginPage.module.css'
import {Link} from 'react-router-dom'
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@material-ui/core'
import {Visibility, VisibilityOff} from '@material-ui/icons'

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

const LoginPage: React.FC = () => {
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <Link to={'/'}>
                    <img className={styles.logo} src={'http://pngimg.com/uploads/amazon/amazon_PNG6.png'} alt={'logo'}/>
                </Link>
                <div className={styles.window}>
                    <h1>Sign-In</h1>
                    <FormControl className={styles.formControl}>
                        <InputLabel htmlFor="outlined-adornment-email" style={{paddingLeft: '16px'}}>E-mail</InputLabel>
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
                        <InputLabel htmlFor="outlined-adornment-password" style={{paddingLeft: '16px'}}>Password</InputLabel>
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
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <button className={styles.submit}>Sign In</button>
                    <p>
                        By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                    </p>
                </div>
                <div className={styles.divider}>
                    <hr/>
                    <span>New to Amazon?</span>
                    <hr/>
                </div>
                <button className={styles.signupBtn}>Create your Amazon account</button>
                <hr className={styles.pageEnd}/>
            </div>
        </div>
    )
}

export default LoginPage