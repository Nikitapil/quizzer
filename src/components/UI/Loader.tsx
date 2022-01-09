import React, { FC } from 'react'
import loaderPic from '../../assets/loader.gif'
import '../../styles/loader.scss'


export const Loader: FC = () => {
    return (
        <div className='Loader'>
            <img src={loaderPic} alt="loader" />
        </div>
    )
}
