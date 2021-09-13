import React from 'react'
import s from '../../common/styles.module.css'
import {useFormik} from 'formik';
import {NavLink, Redirect} from 'react-router-dom';
import SuperInputText from "../../superComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {registerTC} from "../../../m2-bll/registration-reducer";

type SignupFormErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}
export const Register = () => {
    const dispatch = useDispatch()
    const isRegistered = useSelector((state: AppStoreType) => state.register.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: '',
        },
        validate: (values) => {
            const errors: SignupFormErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address.';
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 symbols'
            }
            if (values.password && !values.confirmedPassword) {
                errors.confirmedPassword = 'Confirm your password'
            } else if (values.password !== values.confirmedPassword) {
                errors.confirmedPassword = 'You entered two different passwords.'
            }
            return errors;
        },
        onSubmit: values => {
            if (values.password === values.confirmedPassword) {
                dispatch(registerTC(values))
                formik.resetForm()
            }
        },
    })

    if(isRegistered) {
        return <Redirect to={'./login'}/>
    }

    return (
        <div className={s.bgr}>
            <h1>it-incubator</h1>
            <h2>Sign In</h2>
            <form onSubmit={formik.handleSubmit} className={s.form}>

                <SuperInputText
                    type='email'
                    placeholder='Email'
                    error={formik.touched.email ? formik.errors.email : null}
                    {...formik.getFieldProps('email')}
                />

                <SuperInputText
                    type='password'
                    placeholder='Password'
                    error={formik.touched.password ? formik.errors.password : null}
                    {...formik.getFieldProps('password')}
                    //formik.getFieldProps вместо этого:
                    // name='password'
                    // onChange={formik.handleChange}
                    // value={formik.values.password}
                />

                <SuperInputText
                    type='password'
                    placeholder='Confirm your password'
                    error={formik.touched.confirmedPassword ? formik.errors.confirmedPassword : null}
                    {...formik.getFieldProps('confirmedPassword')}
                />
                <div>
                    <NavLink to='/login'><SuperButton> Cancel </SuperButton></NavLink>
                    <SuperButton type={'submit'}> Register </SuperButton>
                </div>

            </form>
        </div>
    )
}