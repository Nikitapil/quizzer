import React, { FC, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useError } from '../hooks/useError'
import { errorMessages } from '../mock/errorMessages'
import AuthService from '../Services/AuthService'
import { IErrorMessage } from '../types/userTypes'

interface SignInModalProps {
    closeModal: () => void
}

export const SignInModal:FC<SignInModalProps> = ({closeModal}) => {
    const [signInData, setSignUpData] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const checkAuth = useAuth()
    const setAuthError = useError()
    const onInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({...signInData, [e.target.id]: e.target.value})
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            await AuthService.signIn(signInData)
            setSignUpData({email: '', password: ''})
            checkAuth()
            setLoading(false)
            closeModal()
        } catch (error: any) {
            const mess = errorMessages[error.code] || 'Oops something went wrong'
            setAuthError(mess)
            setLoading(false)
        }
    }
 
  return (
    <form className='sign-modal' onSubmit={submitHandler}>
        <label htmlFor="email" >Email:</label>
        <input id='email' type="email" placeholder='Enter email' onChange={onInput}/>
        <label htmlFor="password" >Password:</label>
        <input id='password' type="password" placeholder='Enter password' onChange={onInput}/>
        <div className='sign-modal__btns'>
            <button disabled={loading} type='button' onClick={closeModal} className='sign-cancel-btn'>Cancel</button>
            <button disabled={loading} type='submit' className='sign-submit-btn'>Sign Up</button>
        </div>
    </form>
  )
}