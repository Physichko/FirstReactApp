import React from "react";
import Header from "./Header";
import axios from "axios";
import {setIsToggleFetchingActionCreator, setUserDataActionCreator} from "../../redux/authReducer";
import {connect} from "react-redux";
import Preloader from "../Common/Preloader";

class HeaderContainer extends React.Component{
    componentDidMount() {
        this.props.setToggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials : true})
            .then(response => {
                if(response.data.resultCode === 0)
                {
                    this.props.setUsersProfile(response.data.data);
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