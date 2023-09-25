import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileDataThunkCreator,
    setProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "../../hoc/withRouter";

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
    userId : state.auth.userData.id,
});



export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps,{setProfile:setProfileThunkCreator,getUserStatus:getUserStatusThunkCreator,updateUserStatus:updateUserStatusThunkCreator,savePhoto:savePhotoThunkCreator,saveProfileData:saveProfileDataThunkCreator}),
)(ProfileContainer);