import cssModule from "./Dialog.module.css";
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    let path = `/dialogs/${props.id}`;
    return (
        <div className={cssModule.dialog}>
            <NavLink to={path} className={(navData) => navData.isActive ? cssModule.active : undefined}>{props.name}</NavLink>
        </div>
    );
};

export default Dialog