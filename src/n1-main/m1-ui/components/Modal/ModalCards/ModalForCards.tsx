import React, {ChangeEvent, useState} from 'react';
import SuperInputText from '../../../superComponents/c1-SuperInputText/SuperInputText';
import s from '../Modal.module.css';
import SuperButton from "../../../superComponents/c2-SuperButton/SuperButton";

type ModalForCardsPropsType = {
  closeAddEditCardModal: () => void
  addNewCard: (question: string, answer: string) => void
  title?: string
  questionPlaceholder?: string
  answerPlaceholder?: string
  questionValue?: string
  answerValue?: string
}

export const ModalForCards = (props: ModalForCardsPropsType) => {
  const [question, setQuestion] = useState(props.questionValue ?? '')
  const [answer, addQuestion] = useState(props.answerValue ?? '')

  const inputChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const inputChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    addQuestion(e.currentTarget.value)
  }

  const onClickHandler = () => {
    props.addNewCard(question, answer)
    props.closeAddEditCardModal()
  }

  const onClosedClick = () => {
    props.closeAddEditCardModal()
  }

  return (
    <>
      <div className={s.wrapperModal}>
        <div className={s.modal}>
          <h3>{props.title}</h3>
          <form>
            <SuperInputText
              type='text'
              placeholder={props.questionPlaceholder}
              value={question}
              onChange={inputChangeHandlerQuestion}
            />
            <SuperInputText
              type='text'
              placeholder={props.answerPlaceholder}
              value={answer}
              onChange={inputChangeHandlerAnswer}
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