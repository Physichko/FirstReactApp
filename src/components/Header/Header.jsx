import cssModule from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Preloader from "../Common/Preloader";
const Header = (props) => {
    return (
        <header className={cssModule.header}>
            <NavLink  to="/" className={cssModule.logo}>
                My social network gg
            </NavLink>
            <div className={cssModule.loginBlock}>
                { props.isFetching === true ? <Preloader /> : props.isAuthorized === true ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> : <NavLink className={cssModule.loginBlock} to={"/login"}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;