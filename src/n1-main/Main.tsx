import React, {useEffect} from "react";
import {Header} from "./m1-ui/header/Header";
import {Routes} from "./m1-ui/routes/Routes";
import {HashRouter} from "react-router-dom";
import {AppStoreType} from "./m2-bll/store";
import {useDispatch, useSelector} from "react-redux";
import {setIsInitializedTC} from "./m2-bll/app-reducer";
import {Loader} from "./m1-ui/superComponents/Loader/Loader";

export const Main = () => {

    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsInitializedTC())
    }, [dispatch])

    if(!isInitialized){
        return <Loader />
    }

    return (
        <>
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>
        </>
    )
}