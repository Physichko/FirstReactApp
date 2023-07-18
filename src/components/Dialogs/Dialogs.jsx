import React from "react";
import cssModule from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom"
import NewMessageForm from "./Message/NewMessageForm";


const Dialogs = (props) => {
    let onSubmit = (formData) => {
        props.onSendMessageClick(formData.newMessageText);
    };

    if(!props.isAuthorized) return <Navigate to={"/login"} />

    return (
        <div className={cssModule.dialogs}>
            <div>
                { props.dialogs.map(x => <Dialog id={x.id} name={x.name}/>) }
            </div>
            <div>
                { props.messages.map(x => <Message id={x.id} text={x.text} />) }
                <NewMessageForm />
            </div>
        </div>
    );
}

export default Dialogs;