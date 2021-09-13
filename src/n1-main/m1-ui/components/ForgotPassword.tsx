import React from 'react'
import s from '../common/styles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {recoverPasswordTC} from "../../m2-bll/recoverPassword-reducer";
import SuperButton from "../superComponents/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import SuperInputText from "../superComponents/c1-SuperInputText/SuperInputText";
import {AppStoreType} from '../../m2-bll/store';

export type RecoveryFormikErrorType = {
    email?: string
}
export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const recoveredPassword = useSelector((state: AppStoreType) => state.forgotPassword.recoveredPassword)


    const message = `<div style="background-color: lime; padding: 15px">
            password recovery link:	<a href='https://Peleka.github.io/cards-game/#/new-password/$token$'>link</a>
            </div>`

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: RecoveryFormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required"
            } else if (values.email.length < 11) {
                errors.email = "Email should be more 10 symbols"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(recoverPasswordTC(values.email, message))
        },
    })

    return (
        <div className={s.bgr}>
            <h1>it-incubator</h1>
            <h2>Forgot your password?</h2>
            {!recoveredPassword
                ? <div>
                    <form onSubmit={formik.handleSubmit}>
                        <SuperInputText type='email'
                                        placeholder='Email'
                                        {...formik.getFieldProps('email')}
                        />
                        <SuperButton type={'submit'}>Send instructions</SuperButton>
                    </form>
                </div>
                : <Message email={formik.values.email}/>
            }
        </div>
    )
}


type MessagePropsType = {
    email: string
}
const Message = (props: MessagePropsType) => {
    return (
        <div>
            <h4>Check your Email</h4>
            <span>
                click the link in the message in your email {props.email}
            </span>
        </div>
    )
}