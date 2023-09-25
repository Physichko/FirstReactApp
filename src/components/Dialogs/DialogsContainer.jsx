import {dialogsReducerActionCreators} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages:state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessageClick : (newMessageText) => {
            let action = dialogsReducerActionCreators.addMessageActionCreator(newMessageText);
            dispatch(action)
        },
    };
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);

