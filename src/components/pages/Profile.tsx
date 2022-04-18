import { NavLink, Outlet,  } from 'react-router-dom'
import '../../styles/profile.scss'
export const Profile = () => {
  return (
    <main className='container profile-container'>
        <nav>
            <ul className='profile__nav'>
                <li><NavLink to='/profile/info' className={({ isActive }) =>
                  isActive ? "nav-profile__btn nav-profile__btn-active" : "nav-profile__btn "
                }>Info</NavLink></li>
                <li><NavLink to = '/profile/userquizes' className={({ isActive }) =>
                  isActive ? "nav-profile__btn nav-profile__btn-active" : "nav-profile__btn "
                }>Quizes</NavLink></li>
                <li><NavLink to='/profile/create' className={({ isActive }) =>
                  isActive ? "nav-profile__btn nav-profile__btn-active without-dash" : "nav-profile__btn without-dash"
                }>Create quiz</NavLink></li>
            </ul>
        </nav>
        <Outlet/>
    </main>
  )
}
