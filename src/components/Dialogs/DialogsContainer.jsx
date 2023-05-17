import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages:state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange : (text) => {
            let action = updateNewMessageTextActionCreator(text);
            dispatch(action)
        },
        onSendMessageClick : () => {
            let action = addMessageActionCreator();
            dispatch(action)
        },
    };
};
const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);

export default DialogsContainer;