import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Error404} from "../components/Error404";
import {Login} from "../components/Login/Login";
import {Profile} from "../components/Profile/Profile";
import {Register} from "../components/Registration/Register";
import {NewPassword} from "../components/NewPassword";
import {ForgotPassword} from "../components/ForgotPassword";

import {Packs} from "../components/Packs/Packs";
import {Cards} from "../components/Cards/Cards";
import {Learn} from "../components/Learn/Learn";


export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    FORGOT_PASSWORD: '/forgot-password',
    NEW_PASSWORD: '/new-password',
    PACKS: '/packs',
    CARDS: '/cards/:packID',
    LEARN: '/learn/:packID',
}

export const Routes = () => {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.FORGOT_PASSWORD} render={() => <ForgotPassword/>}/>
                <Route path={PATH.NEW_PASSWORD + '/:token?'} render={() => <NewPassword/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.LEARN} render={() => <Learn/>}/>

                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}