import React from 'react'
import s from '../../common/styles.module.css'
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../superComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../superComponents/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../m2-bll/auth-reducer";
import {useFormik} from 'formik';
import {NavLink, Redirect} from "react-router-dom";
import {AppStoreType} from "../../../m2-bll/store";
import style from './Login.module.css'

type LoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const authErrorMessage = useSelector((state: AppStoreType) => state.auth.authError)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: LoginErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.bgr}>
            <h2> Login </h2>

            <form onSubmit={formik.handleSubmit} className={s.form}>

                <SuperInputText
                    type='email'
                    placeholder='E-mail'
                    error={formik.touched.email ? formik.errors.email : null}
                    {...formik.getFieldProps('email')}
                />

                <SuperInputText
                    type='password'
                    placeholder='Password'
                    error={formik.touched.password ? formik.errors.password : null}
                    {...formik.getFieldProps('password')}
                />

                <br/>

                <div>
                    <SuperCheckbox {...formik.getFieldProps('rememberMe')}/>
                    Remember me
                </div>

                <div className={style.authError}>
                    {authErrorMessage}
                </div>

                <SuperButton type='submit'>
                    Login
                </SuperButton>
            </form>

            <NavLink to='/forgot-password'>Forgot Password</NavLink> <br/>
            <NavLink to="/register">Sign Up</NavLink>
        </div>
    )
}