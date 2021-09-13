import React from 'react'
import s from '../common/styles.module.css'
import SuperInputText from "../superComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../superComponents/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../../m2-bll/setNewPassword-reducer";
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/store";

type SetNewPassErrorType = {
  password?: string
  confirmPassword?: string
}

export const  NewPassword = () => {
  const dispatch = useDispatch()
  const newPasswordSet = useSelector((state: AppStoreType) => state.setNewPassword.isNewPassword)
  const {token} = useParams<{ token: string }>()


  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      // debugger
      const errors: SetNewPassErrorType = {};
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 symbols'
      }
      if (values.password && !values.confirmPassword) {
        errors.confirmPassword = 'Confirm your password'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'You entered two different passwords.'
      }
      return errors;
    },
    onSubmit: values => {
      // debugger
      if (values.password === values.confirmPassword) {
        dispatch(setNewPasswordTC(values.confirmPassword, token))
        formik.resetForm()
      }
      // dispatch(setNewPasswordTC(values.password, token))
    },
  });

  if (newPasswordSet) {
    return <Redirect to={'/login'}/>
  }

    return (
        <div>
            <div className={s.bgr}>
              <h1>it-incubator</h1>
              <h2>Set new password</h2>
              <form onSubmit={formik.handleSubmit} className={s.form}>
                <SuperInputText
                  type='password'
                  placeholder='New password'
                  error={formik.touched.password ? formik.errors.password : null}
                  {...formik.getFieldProps('password')}
                />
                <SuperInputText
                  type='password'
                  placeholder='Confirm your new password'
                  error={formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                  {...formik.getFieldProps('confirmPassword')}
                />
                <SuperButton type={'submit'}>Set new password</SuperButton>
              </form>
            </div>
        </div>
    )
}