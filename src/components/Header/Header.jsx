import cssModule from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Preloader from "../Common/Preloader";
const Header = (props) => {
    return (
        <header className={cssModule.header}>
            <NavLink to="/" className={cssModule.logo}>
                My social network gg
            </NavLink>
            <div className={cssModule.loginBlock}>
                { props.isFetching === true ? <Preloader /> : props.isAuthorized === true ? props.login : <NavLink to={"/login"} />}
            </div>
        </header>
    );
}

export default Header;