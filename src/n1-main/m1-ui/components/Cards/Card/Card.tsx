import React, {useState} from "react";
import s from './Card.module.css'
import {CardDataType} from "../../../../m2-bll/cards-reducer";
import {updateCardDataType} from "../../../../m3-dal/api";
import EditIcon from '@material-ui/icons/Edit';
import {green} from "@material-ui/core/colors";
import {Delete} from '@material-ui/icons';
import {ModalForCards} from "../../Modal/ModalCards/ModalForCards";
import {ModalDeleteItem} from "../../Modal/ModalDelete/ModalDeleteItem";
import {LightTooltip} from "../../../common/LightToolTip";

type CardPropsType = CardDataType & {
    delCard: (id: string, packId: string) => void
    updateCard: (updateCard: updateCardDataType) => void
    packId: string
    currentUserId: string
}

export const Card = (props: CardPropsType) => {


    const deleteCardHandler = () => props._id && props.delCard(props._id, props.packId)
    const updateCardHandler = (question: string, answer: string) =>
        props.updateCard({_id: props._id, question, answer})

    const update = new Date(props.updated).toLocaleDateString(['ban', 'id']);

    // Update card modal
    const [editCardModal, setEditCardsModal] = useState<boolean>(false);
    const openAddEditCardModal = () => {
        setEditCardsModal(true)
    }
    const closeAddEditCardModal = () => {
        setEditCardsModal(false)
    }

    // Delete pack modal
    const [deleteCardModal, setDeleteCardModal] = useState<boolean>(false);
    const openDeleteCardModal = () => {
        setDeleteCardModal(true)
    }
    const closeDeleteCardModal = () => {
        setDeleteCardModal(false)
    }

    return (
        <div className={s.cardItem}>
            <div className={s.cardSpecification}>{props.question}</div>
            <div className={s.cardSpecification}>{props.answer}</div>
            <div className={s.cardSpecification}>{props.grade}</div>
            <div className={s.cardSpecification}>{update}</div>
            <div className={s.cardSpecification}>
                {props.user_id === props.currentUserId
                    ? <LightTooltip title='Edit card'><span style={{cursor: 'pointer'}}>
                        <EditIcon onClick={openAddEditCardModal} style={{color: green[500]}}/></span>
                    </LightTooltip> : ''}
            </div>
            <div className={s.cardSpecification}>
                {props.user_id === props.currentUserId
                    ? <LightTooltip title='Delete card'><span style={{cursor: 'pointer'}}>
                        <Delete onClick={openDeleteCardModal} color='secondary'/></span>
                    </LightTooltip> : ''}
            </div>

            {editCardModal && <ModalForCards
                addNewCard={updateCardHandler}
                closeAddEditCardModal={closeAddEditCardModal}
                title='Edit your card'
                questionValue={props.question}
                answerValue={props.answer}

            />}

            {deleteCardModal && <ModalDeleteItem
                closeDeleteModal={closeDeleteCardModal}
                deleteItem={deleteCardHandler}
                title={`Are you sure you want to delete card '${props.question}'?`}
            />}

        </div>
    )

}
