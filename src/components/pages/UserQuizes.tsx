import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserQuizes } from '../../redux/actionCreators'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { QuizItem } from '../QuizItem'
import { Loader } from '../UI/Loader'
import { Link } from 'react-router-dom'
export const UserQuizes = () => {
    const dispatch = useDispatch()
    const {userId} = useTypedSelector((state) => state.user)
    const {userQuizes, quizLoading} = useTypedSelector((state) => state.quiz)
    useEffect(() => {
        dispatch(fetchUserQuizes())
    }, [userId])
    if (!quizLoading && !userQuizes.length) {
        return (
            <div className='user-quizes__empty'>
                <h1 className='user-quizes__title'>There is no any quizes yet</h1>
                <Link to={'/profile/create'} className="user-quizes__link">Create first</Link>
            </div>
        )
    }
  return (
    <div className='user-quizes'>
        <h1 className='user-quizes__title'>Your Quizes</h1>
        {quizLoading && <Loader/>}
        <ul className='user-quizes__list'>
            {(userQuizes && !quizLoading) && userQuizes.map(quiz => {
                return <QuizItem isUser={true} quiz={quiz} key={quiz.id} />
            })}
        </ul>
    </div>

  )
}
