import React from "react";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/authReducer";
import {connect} from "react-redux";

const HeaderContainer = (props) => {
    return <Header {...props}/>
}

let mapStateToProps = (state) => {
    return {
        id : state.auth.userData.id,
        email : state.auth.userData.email,
        login : state.auth.userData.login,
        isFetching : state.auth.isFetching,
        isAuthorized: state.auth.userData.isAuthorized,
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