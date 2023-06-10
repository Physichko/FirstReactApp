import React from "react";
import Header from "./Header";
import axios from "axios";
import {setIsToggleFetchingActionCreator, setUserDataActionCreator} from "../../redux/authReducer";
import {connect} from "react-redux";
import {authenticationApi} from "../../api/api";

class HeaderContainer extends React.Component{
    componentDidMount() {
        this.props.setToggleIsFetching(true);
        authenticationApi.login()
            .then(data => {
                if(data.resultCode === 0)
                {
                    this.props.setUsersProfile(data.data);
                }
                this.props.setToggleIsFetching(false);
            });
    }

    render() {
        return <Header {...this.props}/>
    }
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
        setToggleIsFetching : (isFetching) => {
            let action = setIsToggleFetchingActionCreator(isFetching);
            dispatch(action);
        },
        setUsersProfile : (userData) => {
            let action = setUserDataActionCreator(userData);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);