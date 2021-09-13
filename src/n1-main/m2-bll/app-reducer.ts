import {AppThunkType} from "./store";
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../m3-dal/api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//action creators
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized
} as const)

//thunk
export const setIsInitializedTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then((res) => {
            dispatch(setIsInitializedAC(true))
            dispatch(setIsLoggedInAC(true,res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(() => {
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

//types
export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>



