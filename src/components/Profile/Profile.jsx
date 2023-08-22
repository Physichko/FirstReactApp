import cssModule from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo updateUserStatus={props.updateUserStatus}
                         profile={props.profile} status={props.status}
                         router={props.router}
                         isProfileOwner={props.isProfileOwner}
                         savePhoto={props.savePhoto}
                         photos={props.photos}
                         saveProfileData={props.saveProfileData}
            />
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;