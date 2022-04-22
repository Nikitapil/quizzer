import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import '../../styles/finalpage.scss'

export const FinalPage = () => {
    const {score} = useTypedSelector(state => state.question)
    const location = useLocation();
    return (
        <main className='final-page'>
            <h1 className='final-page__title'>YOUR SCORE: {score}</h1>
            {location.search && <div className='final-page__btns'>
                <Link to={`/questions${location.search}`} className='question__reset final-page__btn'>Try again</Link>
                <Link to={'/customquizes'} className='question__reset final-page__btn'>Choose another quiz</Link>
                </div>}
            {!location.search && <div className='final-page__btns'>
                <Link to={'/questions'} className='question__reset final-page__btn'>New quiz with the same parametres</Link>
                <Link to={'/'} className='question__reset final-page__btn'>Set new Parametres</Link>
            </div>}
        </main>
    )
}
