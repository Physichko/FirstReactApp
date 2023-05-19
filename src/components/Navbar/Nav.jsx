import cssModule from "./Nav.module.css";
import {NavLink} from "react-router-dom";
const Nav = () => {

    return (
        <nav className={cssModule.nav}>
            <div>
                <NavLink to='/profile' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/news' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>News</NavLink>
            </div >
            <div>
                <NavLink to='/music' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/settings' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>Settings</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={(navData) => navData.isActive ? cssModule.activeButton : cssModule.button}>Find users</NavLink>
            </div>
        </nav>
    );
}

export default Nav;