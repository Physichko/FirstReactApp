import React from "react";
import cssModule from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";


const Dialogs = (props) => {
    let onAddMessage = () => {
        props.onSendMessageClick();
    };

    let onUpdateMessage = (event) => {
        let newMessage = event.target.value;
        props.onNewMessageChange(newMessage);
    };

    return (
        <div className={cssModule.dialogs}>
            <div>
                { props.dialogs.map(x => <Dialog id={x.id} name={x.name}/>) }
            </div>
            <div>
                { props.messages.map(x => <Message id={x.id} text={x.text} />) }
                <span>
                     <textarea onChange={onUpdateMessage} value={props.newMessageText}></textarea>
                     <button onClick={onAddMessage}>Send message</button>
                </span>
            </div>
        </div>
    );
}

export default Dialogs;