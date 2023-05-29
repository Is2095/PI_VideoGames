
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    return (
        <div className={style.landing}>
            <h1 className={style.landingCartel}>Welcome to VIDEOGAME API</h1>
            <Link to='/home'>
                <button className={style.landingButton}>Home Page</button>
            </Link>
        </div>
    )
};

export default Landing;
