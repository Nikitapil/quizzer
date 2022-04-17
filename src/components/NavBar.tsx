import { FC, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AuthService from "../Services/AuthService";
import '../styles/navbar.scss'
import { SignInModal } from "./SignInModal";
import { SignUpModal } from "./SignUpModal";
import { ModalFrame } from "./UI/ModalFrame";
export const NavBar: FC = () => {
    const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false)
    const [isSignInModalOpened, setIsSignInModalOpened] = useState(false)
    const checkAuth =  useAuth()
    const {userId} = useTypedSelector(state => state.user)
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

  return (
    <header className="header container">
      <nav className="nav-bar">
        <ul className="nav-bar__links">
          {!userId && <li><button onClick={changeSignInModalState} className="nav-bar__btn">Sign in</button></li>}
          {!userId && <li><button onClick={changeSignUpModalState} className="nav-bar__btn">Sign up</button></li>}
         {userId && <li><a className="nav-bar__btn">Profile</a></li>}
         {userId && <li><button className="nav-bar__btn" onClick={logout}>Sign out</button></li>}
        </ul>
      </nav>
      {isSignUpModalOpened && <ModalFrame closeModal={changeSignUpModalState} title="Sign Up" children={<SignUpModal closeModal={changeSignUpModalState}/>}></ModalFrame>}
      {isSignInModalOpened && <ModalFrame closeModal={changeSignInModalState} title="Sign Up" children={<SignInModal closeModal={changeSignInModalState}/>}></ModalFrame>}
    </header>
  );
};
