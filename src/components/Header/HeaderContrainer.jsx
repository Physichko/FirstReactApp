import React from "react";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/authReducer";
import {connect} from "react-redux";

const HeaderContainer = (props) => {
    return <Header {...props}/>
}

let mapStateToProps = (state) => {
    return {
        id : state.auth.id,
        email : state.auth.email,
        login : state.auth.login,
        isFetching : state.auth.isFetching,
        isAuthorized: state.auth.isAuthorized,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        logout : () => {
            let thunk = logoutThunkCreator();
            dispatch(thunk);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);