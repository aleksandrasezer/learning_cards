import {AddPackRequestDataType, packsAPI} from "../m3-dal/api";
import {setAppStatusAC} from "./app-reducer";
import {AppThunkType} from "./store";

const initialState = {
    cardPacks: null as null | PackResponseType[],
    maxCardsCount: 6,
    minCardsCount: 0,
    pageCount: 8,
    packId: '',
    name: '',
    totalPacksCount: 0,
    pageSize: 10,
    currentPage: 1,
    userId: '',
    sortPacks: '0updated' as SortPacksOptions,
}
type SortPacksOptions = '0updated' | '1updated'

type InitialStateType = typeof initialState

export const packsReducer = (state = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, cardPacks: action.data}
        case 'SET-TOTAL-PACKS-COUNT':
            return {...state, totalPacksCount: action.totalPacks}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.pageNumber}
        case 'PACKS/DEL-PACK':
            return state
        case 'PACKS/UPDATE-PACK':
            return state
        case 'PACKS/SET-USER-ID':
            return {...state, userId: action.userId}
        case 'PACKS/SET-MIN-CARDS_COUNT':
            return {...state, minCardsCount: action.minCardsCount}
        case "PACKS/SET-MAX-CARDS_COUNT":
            return {...state, maxCardsCount: action.maxCardsCount}
        case "PACKS/SET-NAME":
            return {...state, name: action.name}
        case "PACKS/SET-SORT":
            return {...state, sortPacks: action.sortValue}
        default:
            return state
    }
}

//action creators
export const setMinCardsCountAC = (minCardsCount: number) => ({type: 'PACKS/SET-MIN-CARDS_COUNT', minCardsCount,
} as const)
export const setMaxCardsCountAC = (maxCardsCount: number) => ({type: 'PACKS/SET-MAX-CARDS_COUNT', maxCardsCount,
} as const)

export const setPacksAC = (data: PackResponseType[]) => ({type: 'PACKS/SET-PACKS', data,} as const)
const setTotalPacksCountAC = (totalPacks: number) => ({type: 'SET-TOTAL-PACKS-COUNT', totalPacks,} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', pageNumber,} as const)
export const delPackAC = (id: string) => ({type: 'PACKS/DEL-PACK', id} as const)
export const updatePackAC = (data: UpdatePacksRequestDataType) => ({type: 'PACKS/UPDATE-PACK', data} as const)
export const setUserIdAC = (userId: string) => ({type: 'PACKS/SET-USER-ID', userId} as const)
export const setNameAC = (name: string) => ({type: 'PACKS/SET-NAME', name} as const)
export const setSortPacksAC = (sortValue: SortPacksOptions) => ({type: 'PACKS/SET-SORT', sortValue} as const)


//thunk
export const getPacksTC = (): AppThunkType => (dispatch, getState) => {
    // debugger
    dispatch(setAppStatusAC('loading'))
    const state = getState()
    const currentPage = state.packs.currentPage
    const packName = state.packs.name
    const minCardsCount = state.packs.minCardsCount
    const maxCardsCount = state.packs.maxCardsCount
    const userId = state.packs.userId
    const pageCount = state.packs.pageCount
    const sortPacks = state.packs.sortPacks

    packsAPI.getPacks(pageCount, currentPage, packName, minCardsCount, maxCardsCount, userId, sortPacks)
        .then(res => {
            dispatch(setTotalPacksCountAC(res.data.cardPacksTotalCount))
            dispatch(setPacksAC(res.data.cardPacks))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('get packs error')
        })
}

export const addPackTC = (data: AddPackRequestDataType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.addPack(data)
        .then(() => {
            dispatch(getPacksTC())
            console.log('pack added successfully')
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('add pack error')
        })
}

export const delPackTC = (id: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(getPacksTC())
            console.log('pack deleted successfully')
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('delete pack error')
        })
}

export const updatePackTC = (packId: string, newPackName: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(packId, newPackName)
        .then(() => {
            dispatch(getPacksTC())
            console.log('pack updated successfully')
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
            console.log('update pack error')
        })
}

//types
export type PacksActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setTotalPacksCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof delPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setUserIdAC>
    | ReturnType<typeof setMinCardsCountAC>
    | ReturnType<typeof setMaxCardsCountAC>
    | ReturnType<typeof setNameAC>
    | ReturnType<typeof setSortPacksAC>

export type GetPacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: string
    user_id?: string
}

export type PackResponseType = {
    "_id": string,
    "user_id": string,
    "user_name": string,
    "private": boolean,
    "name": string,
    "path": string,
    "grade": number,
    "shots": number,
    "cardsCount": number,
    "type": string,
    "rating": number,
    "created": string,
    "updated": string,
    "more_id": string,
    "__v": number,
}

export type UpdatePacksRequestDataType = {
    _id: string
    name?: string
    private?: boolean
}
