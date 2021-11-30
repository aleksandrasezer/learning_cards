import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {RequestStatusType} from "../../../m2-bll/app-reducer";
import {CardDataType, getCardsTC, sendGradeTC, setPageCountAC} from "../../../m2-bll/cards-reducer";
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import {Loader} from "../../superComponents/Loader/Loader";
import {Button, ButtonGroup} from "@material-ui/core";
import s from './Learn.module.css'

export const Learn = () => {
    const {packID} = useParams<{ packID: string }>()
    const dispatch = useDispatch()

    const cards = useSelector<AppStoreType, Array<CardDataType>>((state) => state.cards.cards)
    const status = useSelector<AppStoreType, RequestStatusType>((state) => state.app.status)

    const grades = ['no idea', 'forgot', 'it took me a while', 'confused a little', 'I knew'];

    const [currentQuestion, setQuestion] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [stop, setStop] = useState(false)
    const [grade, setGrade] = useState(0)

    useEffect(() => {
        dispatch(setPageCountAC(1000))
        dispatch(getCardsTC(packID))
        dispatch(setPageCountAC(5))
    }, [dispatch, packID])

    const nextQuestion = () => {
        if (cards.length !== currentQuestion + 1) {
            setQuestion(currentQuestion + 1)
        } else {
            setStop(true)
        }
        grade > 0 && dispatch(sendGradeTC(cards[currentQuestion]._id, grade))
        setAnswer(false)
        setGrade(0)
    }

    const setAnswerHandler = () => {
        setAnswer(true)
    }
    const rollbackHandler = () => {
        setQuestion(0)
        setStop(false)
    }

    return (
        <div>
            {status === 'loading' && <Loader/>}
            <div className={s.goToPacks}>
                <NavLink
                    to={'/packs'}>
                    🔙 back to Packs
                </NavLink>
            </div>
            {
                cards.length === 0
                    ? <div>
                        <span>There are no cards in this pack...</span>
                    </div>
                    : <div>
                        {stop
                            ? <div className={s.startOver}>
                                <div className={s.qOver}>The questions are over:)</div>
                                <SuperButton onClick={rollbackHandler}>Start over</SuperButton>
                            </div>
                            : <>
                                <div className={s.question}>
                                    Question: {cards[currentQuestion].question}
                                </div>
                                <SuperButton onClick={setAnswerHandler} disabled={answer}>CHECK</SuperButton>
                                {
                                    answer && (
                                        <div>
                                            <div className={s.answer}>Answer: {cards[currentQuestion].answer}</div>
                                            <div className={s.options}>
                                                {grades.map((el, i) => {
                                                    const settingGrades = () => {
                                                        setGrade(i + 1)
                                                    }
                                                    return (

                                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">


                                                        <Button
                                                            key={i + 1}
                                                            onClick={settingGrades}
                                                            disabled={i + 1 === grade}
                                                        >
                                                            {el}
                                                        </Button>
                                                        </ButtonGroup>
                                                    )
                                                })}
                                            </div>
                                            <SuperButton onClick={nextQuestion}>NEXT</SuperButton>
                                        </div>
                                    )
                                }
                            </>
                        }
                    </div>
            }
        </div>
    )
}