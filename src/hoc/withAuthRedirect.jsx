import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsRedirect = (state) => ({
    isAuthorized: state.auth.isAuthorized,
});
export const withAuthRedirect = (Component) => {
    let componentWithRedirect = (props) => {
        if(!props.isAuthorized)
            return <Navigate to={"/login"} />
        return <Component {...props} />
    };

    let connectedProfileContainerWithAuth = connect(mapStateToPropsRedirect)(componentWithRedirect);
    return connectedProfileContainerWithAuth;
}