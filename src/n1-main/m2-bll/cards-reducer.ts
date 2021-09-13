import {setAppStatusAC} from "./app-reducer";
import {cardsAPI, CreateCardRequestDataType, updateCardDataType} from "../m3-dal/api";
import {AppThunkType} from "./store";

const initialState = {
    cards: [] as Array<CardDataType>,
    packUserId: '',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 6,
    sortCards: '0grade' as SortCardsOptions,
}

type SortCardsOptions = '0grade' | '1grade'

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        case "CARDS/SET_CARDS_TOTAL_COUNT":
            return {...state, cardsTotalCount: action.totalCards}
        case "CARDS/SET_CURRENT_PAGE":
            return {...state, page: action.page}
        case "CARDS/SET-SORT":
            return {...state, sortCards: action.sortValue}
        case "CARDS/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        default:
            return state
    }
}

//action creators
export const setCardsAC = (cards: CardDataType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsTotalCountAC = (totalCards: number) => ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', totalCards} as const)
export const setCardsCurrentPageAC = (page: number) => ({type: 'CARDS/SET_CURRENT_PAGE', page} as const)
export const setSortCardsAC = (sortValue: SortCardsOptions) => ({type: 'CARDS/SET-SORT', sortValue} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'CARDS/SET-PAGE-COUNT', pageCount} as const)


//thunk
export const getCardsTC = (cardsPack_id: string): AppThunkType => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const state = getState()
    const page = state.cards.page
    const pageCount = state.cards.pageCount
    const sortCards = state.cards.sortCards
    cardsAPI.getCards(cardsPack_id, page, pageCount, sortCards)
        .then(res => {
            dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            dispatch(setCardsAC(res.data.cards))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('get cards error')
        })
}

export const addCardTC = (data: CreateCardRequestDataType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.addCard(data)
        .then(() => {
            dispatch(getCardsTC(data.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            const error = e.res ? e.res.data.error : (`Add card failed: ${e.message}.`)
            dispatch(setAppStatusAC('failed'))
            alert(error)
        })
}

export const delCardTC = (id: string, packId: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(id)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(getCardsTC(packId))
            console.log('card deleted successfully')
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('delete card error')
        })
}

export const updateCardTC = (packId: string, updateCardData: updateCardDataType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(updateCardData)
        .then(() => {
            dispatch(getCardsTC(packId))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ' , error')
            dispatch(setAppStatusAC('failed'))
            alert(error)
        })
}

export const sendGradeTC = (cardId: string, grade: number): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.sendGrade(cardId, grade)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ' , error')
            dispatch(setAppStatusAC('failed'))
            alert(error)
        })
}

//types
export type CardsActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof setCardsCurrentPageAC>
    | ReturnType<typeof setSortCardsAC>
    | ReturnType<typeof setPageCountAC>

// export type GetCardsRequestDataType = {
//     cardAnswer?: string
//     cardQuestion?: string
//     cardsPack_id: string
//     min?: number
//     max?: number
//     sortCards?: number
//     page?: number
//     pageCount?: number
// }

export type CardDataType = {
    cardsPack_id: string
    answer: string
    comments?: string
    created?: string
    grade?: number
    more_id?: string
    question: string
    questionImg?: string
    rating?: number
    shots?: number
    type?: string
    updated: string
    user_id?: string
    __v?: number
    _id: string
}