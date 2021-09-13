import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {registerReducer} from "./registration-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {recoverPasswordReducer} from "./recoverPassword-reducer";
import {setNewPasswordReducer} from "./setNewPassword-reducer";
import {PacksActionsType, packsReducer} from "./packs-reducer";
import {CardsActionsType, cardsReducer} from "./cards-reducer";

const reducers = combineReducers({
    auth: authReducer,
    register: registerReducer,
    app: appReducer,
    forgotPassword: recoverPasswordReducer,
    setNewPassword: setNewPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
});
export type AppActions = PacksActionsType | CardsActionsType | AppActionsType
export type AppThunkType<ReturnType= void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActions>

const store = createStore(reducers, applyMiddleware(thunk));

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
