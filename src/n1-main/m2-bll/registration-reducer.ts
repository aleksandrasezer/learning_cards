import {registerAPI} from "../m3-dal/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";

const initialState = {
    isRegistered: false
}

type InitialStateType = typeof initialState

export const registerReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "register/SET-SIGN-UP":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

//actions
export const setSignUpAC = (isRegistered: boolean) => ({
    type: 'register/SET-SIGN-UP',
    isRegistered
} as const)

//thunks
export const registerTC = (values: UserLoginData) => {
    return (dispatch: Dispatch<ActionsType>) =>  {
        dispatch(setAppStatusAC('loading'))
        registerAPI.register(values.email, values.password)
            .then(() => {
                dispatch(setSignUpAC(true))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : e.message
                alert(error)
            })
    }
}


//types
type ActionsType = ReturnType<typeof setSignUpAC> | ReturnType<typeof setAppStatusAC>
type UserLoginData = {
    email: string
    password: string
}