import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/errorpage.scss'
import { Loader } from '../UI/Loader'

interface ErrorPageProps {
    isLoading: boolean
}

export const ErrorPage:FC<ErrorPageProps> = ({isLoading}) => {
    const navigate = useNavigate()
    if (isLoading) {
        return(
            <main className='container loader__container'><Loader/></main>
        )
    }
  return (
    <main className='container errorpage__container'>
        <h1 className='errorpage__title'>Oops Something went wrong</h1>
        <p className='errorpage__404'>404</p>
        <button onClick={() => navigate('/')} className='errorpage__home-btn'>GO HOME</button>
    </main>
  )
}
