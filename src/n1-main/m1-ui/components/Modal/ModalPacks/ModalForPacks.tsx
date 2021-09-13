import React, {ChangeEvent, useState} from 'react';
import SuperInputText from '../../../superComponents/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../superComponents/c2-SuperButton/SuperButton';
import s from '../Modal.module.css';

type ModalForPacksPropsType = {
  closeAddEditPackModal: () => void
  addNewPack: (name: string) => void
  titlePack?: string
  placeholder?: string
}

export const ModalForPacks = (props: ModalForPacksPropsType) => {
  const [newText, setNewText] = useState(props.titlePack ?? '')

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewText(e.currentTarget.value)
  }

  const onClickHandler = () => {
    props.addNewPack(newText)
    props.closeAddEditPackModal()
  }

  const onClosedClick = () => {
    props.closeAddEditPackModal()
  }

  return (
    <>
      <div className={s.wrapperModal}>
        <div className={s.modal}>
          <h3>Enter new pack name</h3>
          <form>
            <SuperInputText
              type='text'
              placeholder={props.placeholder}
              value={newText}
              onChange={inputChangeHandler}
            />
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