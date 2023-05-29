import cssModule from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader";
const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
        <div className={cssModule.container}>
            <div className={cssModule.descriptionBlock}>
                <div className={cssModule.avatar}>
                    <img src={props.profile.photos.large}/>
                </div>
                <div className={cssModule.nameStatus}>
                    <div className={cssModule.name}>
                        <text>{props.profile.fullName}</text>
                    </div>
                    <div className={cssModule.status}>
                        <text>{props.profile.lookingForAJobDescription}</text>
                    </div>
                </div>
                <div className={cssModule.contacts}>
                    <ul>
                        <li>Github : {props.profile.contacts.github}</li>
                        <li>VK : {props.profile.contacts.vk}</li>
                        <li>Facebook : {props.profile.contacts.facebook}</li>
                        <li>Instagram : {props.profile.contacts.instagram}</li>
                        <li>Twitter : {props.profile.contacts.twitter}</li>
                        <li>Website : {props.profile.contacts.website}</li>
                        <li>Youtube : {props.profile.contacts.youtube}</li>
                        <li>MainLink : {props.profile.contacts.mainLink}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;