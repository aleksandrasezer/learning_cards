import axios from "axios";

export const instance = axios.create(
    {
        baseURL: "https://neko-back.herokuapp.com/2.0/",
        withCredentials: true,
    })

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me')
    },
    me() {
        return instance.post('auth/me')
    },
}

export const registerAPI = {
    register(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    }
}

export const recoverPasswordAPI = {
    recoverPassword(email: string, message: string) {
        return instance.post('/auth/forgot', {email, message})
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post('/auth/set-new-password', {password, resetPasswordToken})
    }
}

export const packsAPI = {
    getPacks(pageCount: number, currentPage: number, packName: string, minCardsCount: number,
             maxCardsCount: number, userId: string, sortPacks: string) {
        return instance
            .get(`/cards/pack?pageCount=${pageCount}&sortPacks=${sortPacks}&packName=${packName}&page=${currentPage}&min=${minCardsCount}&max=${maxCardsCount}&user_id=${userId}`)
    },
    addPack(data: AddPackRequestDataType) {
        return instance.post('/cards/pack', {cardsPack: data})
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(packId: string, newPackName: string) {
        return instance.put('/cards/pack', {
            cardsPack: {_id: packId, name: newPackName}
        })
    },
}

export const cardsAPI = {
    getCards(cardsPack_id: string, page: number, pageCount: number, sortCards: string) {
        return instance.get(`/cards/card`, {
            params: {
                cardsPack_id: cardsPack_id,
                pageCount: pageCount,
                page: page,
                sortCards: sortCards,
            }
        })
    },
    addCard(data: CreateCardRequestDataType) {
        return instance.post('/cards/card', {card: data})
    },
    deleteCard(cardsPack_id: string) {
        return instance.delete(`/cards/card?id=${cardsPack_id}`)
    },
    updateCard(updateCardData: updateCardDataType) {
        return instance.put('cards/card', {
            card: {
                _id: updateCardData._id,
                question: updateCardData.question,
                answer: updateCardData.answer,
            }
        })
    },
    sendGrade(card_id: string, grade: number) {
        return instance.put('/cards/grade', {
            grade: grade,
            card_id: card_id
        })
    }
}


//types
export type updateCardDataType = {
    _id: string,
    question: string,
    answer: string
}

export type CreateCardRequestDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    type?: string
}

export type AddPackRequestDataType = {
    name?: string
    private?: boolean
}