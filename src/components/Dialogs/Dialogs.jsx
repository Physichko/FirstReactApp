import React from "react";
import cssModule from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";


const Dialogs = ({dialogsPage}) => {
    let inputRef = React.createRef();
    let sendMessage = () => {
        let text = inputRef.current.value;
        alert(text);
    };

    return (
        <div className={cssModule.dialogs}>
            <div>
                { dialogsPage.dialogs.map(x => <Dialog id={x.id} name={x.name}/>) }
            </div>
            <div>
                { dialogsPage.messages.map(x => <Message id={x.id} text={x.text} />) }
                <span>
                     <textarea ref={inputRef}></textarea>
                     <button onClick={sendMessage}>Send message</button>
                </span>
            </div>
        </div>
    );
}

export default Dialogs;