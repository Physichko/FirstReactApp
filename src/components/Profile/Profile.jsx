import cssModule from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
    return (
        <div className={cssModule.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    );
};

export default Profile;