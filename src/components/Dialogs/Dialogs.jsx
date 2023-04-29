import cssModule from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = `/dialogs/${props.id}`;
    return (
        <div className={cssModule.dialog}>
            <NavLink to={path} className={(navData) => navData.isActive && cssModule.active }>{props.name}</NavLink>
        </div>
    );
};

const Message = (props) => {
    return (
        <div className={cssModule.message}>
            {props.text}
        </div>
    );
};
const Dialogs = (props) => {
    let dialogsData = [
        { id: 1, name : "Lioshka"},
        { id: 2, name : "Nastya"},
        { id: 3, name : "Alisa"},
        { id: 4, name : "Alena"},
        { id: 5, name : "Egorus"},
        { id: 6, name : "Pashka"}
    ];

    let messagesData = [
        { id: 1, message : "Hi"},
        { id: 2, message : "How are you doing?"},
        { id: 3, message : "Bye"},
        { id: 4, message : "Yo"},
        { id: 5, message : "Yo"},
        { id: 6, message : "Yo"}
    ];

    return (
        <div className={cssModule.dialogs}>
            <div className={cssModule.dialogItems}>
                {
                    dialogsData.map(x => {
                        return <DialogItem id={x.id} name={x.name}/>
                    }
                )}
            </div>
            <div className={cssModule.messages}>
                {
                    messagesData.map(x => {
                        return <Message id={x.id} message={x.message} />
                    })
                }
            </div>
        </div>
    );
}

export default Dialogs;