import cssModule from "./Header.module.css";
import {NavLink} from "react-router-dom";
const Header = () => {
    return (
        <header className={cssModule.header}>
            <NavLink to="/" className={cssModule.logo}>
                My social network
            </NavLink>
        </header>
    );
}

export default Header;