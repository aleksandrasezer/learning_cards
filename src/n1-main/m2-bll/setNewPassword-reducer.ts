import {setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {recoverPasswordAPI} from "../m3-dal/api";

const initialState = {
  isNewPassword: false
}

type InitialStateType = typeof initialState

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'setNewPassword/SET-NEW-PASSWORD':
      return {...state, isNewPassword: true}
    default:
      return state
  }
}

// AC
const setNewPasswordAC = () => ({
  type: 'setNewPassword/SET-NEW-PASSWORD'
} as const)


// Thunk
export const setNewPasswordTC = (password: string, resetPasswordToken: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    recoverPasswordAPI.setNewPassword(password, resetPasswordToken)
    .then(() => {
      dispatch(setNewPasswordAC())
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((e) => {
      const error = e.response ? e.response.data.error : e.message
      alert(error)
    })
  }
}

// Type
type ActionsType = ReturnType<typeof setNewPasswordAC> | ReturnType<typeof setAppStatusAC>