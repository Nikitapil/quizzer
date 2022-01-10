import React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import '../../styles/finalpage.scss'

export const FinalPage = () => {
    const {score} = useTypedSelector(state => state.question)
    return (
        <main className='final-page'>
            <h1 className='final-page__title'>YOUR SCORE: {score}</h1>
            <div className='final-page__btns'>
                <Link to={'/questions'} className='question__reset final-page__btn'>New quiz with the same parametres</Link>
                <Link to={'/'} className='question__reset final-page__btn'>Set new Parametres</Link>
            </div>
        </main>
    )
}
