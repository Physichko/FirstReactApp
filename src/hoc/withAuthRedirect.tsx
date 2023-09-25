
import React, {FC} from "react";
import {AppStateType} from "../redux/reduxStore";
import {connect} from "react-redux";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

interface OwnProps {
    // Пропсы, специфичные для вашей компоненты
}

interface StateProps {
    isAuthorized : boolean
}

interface DispatchProps {
    // Действия Redux, которые вы хотите использовать в компоненте
}

type Props = OwnProps & StateProps & DispatchProps;
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.auth.userData.isAuthorized,
    };
};

export function withAuthRedirect<WCP  extends IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>){
    const RedirectComponent : FC<> = () =>{

    }

    return connect(mapStateToProps)(RedirectComponent)
}