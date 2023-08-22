import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileDataThunkCreator,
    setProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {useParams} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {
    const refreshProfile = () => {
        let userId = props.router.userId;
        if (!userId) userId = props.userId;
        props.setProfile(userId);
        props.getUserStatus(userId);
    };


    useEffect( () => {
        refreshProfile();
    },[props.router.userId]);


    return <Profile {...props}
                        profile={props.profile}
                        status={props.status}
                        updateUserStatus={props.updateUserStatus}
                        isProfileOwner={props.userId && (props.router.userId === props.userId || props.router.userId === undefined)}
                        savePhoto={props.savePhoto}
                        saveProfileData={props.saveProfileData}
    />
}
let mapStateToProps = (state) => ({
    profile : state.profilePage.profile,
    status : state.profilePage.status,
    userId : state.auth.id,
});

/*let mapDispatchToProps = (dispatch) => ({
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
    },
    saveProfileData : (data,setErrors) => {
        let thunk = saveProfileDataThunkCreator(data,setErrors);
        dispatch(thunk);
    },
});*/

export function withRouter(ComponentToAddRouter) {
    function ComponentWithRouterProp(props) {
        const params = useParams();
        return <ComponentToAddRouter {...props} router={params} />;
    }

    return ComponentWithRouterProp;
}

export default compose(
    connect(mapStateToProps,{setProfile:setProfileThunkCreator,getUserStatus:getUserStatusThunkCreator,updateUserStatus:updateUserStatusThunkCreator,savePhoto:savePhotoThunkCreator,saveProfileData:saveProfileDataThunkCreator}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);