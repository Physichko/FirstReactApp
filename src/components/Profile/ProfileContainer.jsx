import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator,
    setProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {useParams} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.router.userId;
        if (!userId) userId = this.props.userId;
        this.props.setProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
    }
}
let mapStateToProps = (state) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    userId : state.auth.id,
});

let mapDispatchToProps = (dispatch) => ({
    setProfile: (userId) => {
        let thunk = setProfileThunkCreator(userId);
        dispatch(thunk);
    },
    getUserStatus : (userId) => {
        let thunk = getUserStatusThunkCreator(userId);
        dispatch(thunk);
    },
    updateUserStatus : (status) => {
        let thunk = updateUserStatusThunkCreator(status);
        dispatch(thunk);
    }
});

export function withRouter(ComponentToAddRouter) {
    function ComponentWithRouterProp(props) {
        const params = useParams();
        return <ComponentToAddRouter {...props} router={params} />;
    }

    return ComponentWithRouterProp;
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);