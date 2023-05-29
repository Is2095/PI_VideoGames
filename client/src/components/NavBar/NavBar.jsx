
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <Link to='/create'>Create Videogame</Link>          
            <Link to='/home'>Home Page</Link>
            <Link to='/'>Exit</Link>
        </div>
    )
};

export default NavBar;