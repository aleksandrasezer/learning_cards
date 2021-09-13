import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/api";
import {setAppStatusAC} from "./app-reducer";


const initialState = {
    userData: {
        avatar: '',
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: '',
    } || null,
    isLoggedIn: false,
    authError: '',
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, userData: action.userData, isLoggedIn: action.value}
        case 'login/SET-IS-LOGGED-OUT':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-AUTH-ERROR':
            return {...state, authError: action.errorMessage}
        default:
            return state
    }
};

//actions
export const setIsLoggedInAC = (value: boolean, userData: UserDataResponseType) => ({
    type: 'login/SET-IS-LOGGED-IN', value, userData
} as const)
export const setIsLoggedOutAC = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-OUT', value
} as const)

const setAuthErrorAC = (errorMessage: string) => ({
    type: 'login/SET-AUTH-ERROR', errorMessage
} as const)

//thunks
export const loginTC = (values: UserLoginData) => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setAppStatusAC('loading'))

    authAPI.login(values.email, values.password, values.rememberMe)
        .then((res) => {
            dispatch(setIsLoggedInAC(true, res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : e.message
            dispatch(setAuthErrorAC(error))
            dispatch(setAppStatusAC('failed'))

        })
}

export const logoutTC = (dispatch: Dispatch<ActionsType>) => {
    try {
        authAPI.logout().then(() => {
            dispatch(setIsLoggedOutAC(false))
        })
    } catch (e) {

    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsLoggedOutAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAuthErrorAC>


export type UserLoginData = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserDataResponseType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}