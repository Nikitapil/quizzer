import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { fetchCustomQuizActin, fetchQuestions, incrementScore, loadQuestions } from '../../redux/actionCreators'
import { SingleQuestion } from '../SingleQuestion'
import '../../styles/question.scss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../UI/Loader'
export const QuestionPage:FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const {questionsAmount,questionCategory, questionDificulty, questionType} = useTypedSelector(state => state.main)
    const {questions, questionLoading, score, questionError} = useTypedSelector(state => state.question)
    const {userId} = useTypedSelector((state) => state.user)
    const location = useLocation();
    useEffect(() => {
        if (location.search) {
            dispatch(fetchCustomQuizActin(location.search.slice(1)))
            dispatch(incrementScore(0))
        }
        else {
            dispatch(fetchQuestions(questionsAmount, questionCategory, questionDificulty, questionType))
            dispatch(incrementScore(0))
        }
        console.log(location);
    }, [])

    const nextQuestion = () => {
        if (currentQuestion < questions.length-1) {
            setCurrentQuestion(currentQuestion+1)
        }
        else {
            const url = location.search ? `/finalpage${location.search}` : '/finalpage'
            navigate(url)
        }
    }

    const goToMain = () => {
        dispatch(loadQuestions([]))
        navigate('/')
    }
    if (questionError) {
        return (
            <div className="error">
          Oops! Couldn't load questions, try reload the page or <Link to = '/'>Go back</Link>
        </div>
        )
    }
    return (
        <main className='question__container container'>
            <button className='question__reset' onClick={goToMain}>Go to Main</button>
            <h2 className='question__score'>Total score: {score}</h2>
            {!questionLoading && questions.length === 0 && <p>Sorry! there is no question that mathes to your parametres, go back and change something</p>}
            {questionLoading ? <Loader/> : questions.slice(currentQuestion, currentQuestion+1).map((item) => {
                return (
                    <SingleQuestion nextQuestion={nextQuestion} key={item.question} question={item} />
                )
            })}
            <p className='question__pagination'>{currentQuestion+1}/{questionsAmount}</p>
        </main>
    )
}
