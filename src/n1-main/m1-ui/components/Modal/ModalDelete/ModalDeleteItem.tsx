import s from '../Modal.module.css';
import React from "react";
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";

type ModalDeletePropsType = {
    closeDeleteModal: () => void
    deleteItem: () => void
    title: string
}

export const ModalDeleteItem = (props: ModalDeletePropsType) => {

    const onClickHandler = () => {
        props.deleteItem()
        props.closeDeleteModal()
    }

    const onClosedClick = () => {
        props.closeDeleteModal()
    }

    return (
        <>
            <div className={s.wrapperModal} onClick={props.closeDeleteModal}>
                <div className={s.modal} onClick={e => e.stopPropagation()}>
                    <h3 style={{color: 'darkred'}}>{props.title}</h3>
                    <form>
                        <div className={s.buttonBlock}>
                            <SuperButton type='submit' onClick={onClickHandler}>Ok</SuperButton>
                            <SuperButton onClick={onClosedClick}>Cancel</SuperButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}