import cssModule from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo updateUserStatus={props.updateUserStatus} profile={props.profile} status={props.status} router={props.router}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;