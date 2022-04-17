import { useDispatch } from 'react-redux';
import { setAuthError } from '../redux/actionCreators';
export const useError = () => {
    const dispatch = useDispatch()
    return (message:string, timout: number = 3500) => {
        dispatch(setAuthError(message))
        setTimeout(() => {dispatch(setAuthError(''))}, timout)
    }
}