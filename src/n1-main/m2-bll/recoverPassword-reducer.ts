import {Dispatch} from "redux";
import {recoverPasswordAPI} from "../m3-dal/api";
import {setAppStatusAC} from "./app-reducer";

const initialState = {
    recoveredPassword: false
};

type InitialStateType = typeof initialState

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'recoverPassword/CHANGE-PASSWORD':
            return {...state, recoveredPassword: true}
        default:
            return state
    }
}

//actions
export const recoverPasswordAC = () => ({
    type: 'recoverPassword/CHANGE-PASSWORD'
} as const)

//thunks
export const recoverPasswordTC = (email: string, message: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        recoverPasswordAPI.recoverPassword(email, message)
            .then(() => {
                dispatch(recoverPasswordAC())
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((e) => {
                const error = e.response ? e.response.data.error : e.message
                alert(error)
            })
    }
}
// types
type ActionsType = ReturnType<typeof recoverPasswordAC> | ReturnType<typeof setAppStatusAC>