import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserQuizes } from '../../redux/actionCreators'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { QuizItem } from '../QuizItem'
import { Loader } from '../UI/Loader'
export const UserQuizes = () => {
    const dispatch = useDispatch()
    const {userId} = useTypedSelector((state) => state.user)
    const {userQuizes, quizLoading} = useTypedSelector((state) => state.quiz)
    useEffect(() => {
        dispatch(fetchUserQuizes())
    }, [userId])

  return (
    <div className='user-quizes'>
        <h1 className='user-quizes__title'>Your Quizes</h1>
        {quizLoading && <Loader/>}
        <ul className='user-quizes__list'>
            {(userQuizes && !quizLoading) && userQuizes.map(quiz => {
                return <QuizItem quiz={quiz} key={quiz.id} />
            })}
        </ul>
    </div>

  )
}
