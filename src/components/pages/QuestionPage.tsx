import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { fetchQuestions, loadQuestions } from '../../redux/actionCreators'
import { SingleQuestion } from '../SingleQuestion'
import '../../styles/question.scss'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../UI/Loader'
export const QuestionPage:FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const {questionsAmount,questionCategory, questionDificulty, questionType} = useTypedSelector(state => state.main)
    const {questions} = useTypedSelector(state => state.question)

    useEffect(() => {
        dispatch(fetchQuestions(questionsAmount, questionCategory, questionDificulty, questionType))
    }, [])

    const nextQuestion = () => {
        if (currentQuestion < questions.length-1) {
            setCurrentQuestion(currentQuestion+1)
        }
    }

    const goToMain = () => {
        dispatch(loadQuestions([]))
        navigate('/')
    }

    return (
        <main className='question__container container'>
            <button className='question__reset' onClick={goToMain}>Go to Main</button>
            {questions.slice(currentQuestion, currentQuestion+1).map((item) => {
                return (
                    <SingleQuestion nextQuestion={nextQuestion} key={item.question} question={item} />
                )
            })}
        </main>
    )
}
