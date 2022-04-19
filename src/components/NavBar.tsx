import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUserName } from "../redux/actionCreators";
import AuthService from "../Services/AuthService";
import '../styles/navbar.scss'
import { SignInModal } from "./SignInModal";
import { SignUpModal } from "./SignUpModal";
import { ModalFrame } from "./UI/ModalFrame";

export const NavBar: FC = () => {
    const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false)
    const [isSignInModalOpened, setIsSignInModalOpened] = useState(false)
    const checkAuth =  useAuth()
    const dispatch = useDispatch()
    const {userId, userName} = useTypedSelector(state => state.user)
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)


    const changeSignUpModalState = () => {
        setIsSignUpModalOpened(!isSignUpModalOpened)
    }
    
    const changeSignInModalState = () => {
        setIsSignInModalOpened(!isSignInModalOpened)
    }

    const logout = async () => {
      await AuthService.signOut()
      checkAuth()
    }

    useEffect(() => {
      dispatch(fetchUserName())
    }, [userId, userName])

  return (
    <header className="header container">
      <h1>Welcome {userName || 'Guest'}</h1>
      <nav className="nav-bar">
        <ul className={`nav-bar__links ${isMobileMenuActive && 'nav-active'}`}>
        <li onClick={() => setIsMobileMenuActive(false) }><NavLink to={'/'} className={({ isActive }) =>
                  isActive ? "nav-bar__btn nav-bar__btn-active" : "nav-bar__btn "
                }>Main</NavLink></li>
        <li onClick={() => setIsMobileMenuActive(false) }><NavLink to={'/customquizes'} className={({ isActive }) =>
                  isActive ? "nav-bar__btn nav-bar__btn-active" : "nav-bar__btn "
                }>Custom quizes</NavLink></li>
          {!userId && <li onClick={() => setIsMobileMenuActive(false) }><button onClick={changeSignInModalState} className="nav-bar__btn">Sign in</button></li>}
          {!userId && <li onClick={() => setIsMobileMenuActive(false) }><button onClick={changeSignUpModalState} className="nav-bar__btn">Sign up</button></li>}
         {userId && <li onClick={() => setIsMobileMenuActive(false) }><NavLink to={'/profile/info'} className={({ isActive }) =>
                  isActive ? "nav-bar__btn nav-bar__btn-active" : "nav-bar__btn "
                }>Profile</NavLink></li>}
         {userId && <li onClick={() => setIsMobileMenuActive(false) }><button className="nav-bar__btn" onClick={logout}>Sign out</button></li>}
        </ul>
        <button className={`mobile-btn ${isMobileMenuActive && 'nav-active'}`} onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}><span></span></button>
      </nav>
      {isSignUpModalOpened && <ModalFrame closeModal={changeSignUpModalState} title="Sign Up" children={<SignUpModal closeModal={changeSignUpModalState}/>}></ModalFrame>}
      {isSignInModalOpened && <ModalFrame closeModal={changeSignInModalState} title="Sign Up" children={<SignInModal closeModal={changeSignInModalState}/>}></ModalFrame>}
    </header>
  );
};
