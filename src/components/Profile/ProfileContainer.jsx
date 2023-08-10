import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator, savePhotoThunkCreator,
    setProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {useParams} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component{

    refreshProfile()
    {
        let userId = this.props.router.userId;
        if (!userId) userId = this.props.userId;
        this.props.setProfile(userId);
        this.props.getUserStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.router.userId !== this.props.router.userId)
            this.refreshProfile();
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateUserStatus={this.props.updateUserStatus}
                        isProfileOwner={this.props.userId && (this.props.router.userId === this.props.userId || this.props.router.userId === undefined)}
                        savePhoto={this.props.savePhoto}
        />
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
    },
    savePhoto : (file) => {
        let thunk = savePhotoThunkCreator(file);
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