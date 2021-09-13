import React from 'react'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {Login} from "../Login/Login";
import cloud from '../../common/images/cloud.png';
import s from './Cloud.module.css'

export const  Profile = () => {

    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const userName = useSelector((state: AppStoreType) => state.auth.userData?.name)
    const myPacksCount = useSelector((state: AppStoreType) => state.auth.userData?.publicCardPacksCount)

    let nameOnDisplay = userName ?? 'Stranger'

    if (!isLoggedIn) {
        return <Login />
    }

    return (
        <div>
            <div className={s.hello}>
                <h2>Hello, {nameOnDisplay}!</h2>
                <h3>You have {myPacksCount} packs</h3>

                <div className={s.cloud}>
                <img src={cloud} alt="Cloud" />
            </div>
            </div>
        </div>
    )
}