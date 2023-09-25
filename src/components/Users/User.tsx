import {NavLink} from "react-router-dom";
import cssModule from "./Users.module.css";
import noAvatar from "../../assets/images/images.png";
import React, {FC} from "react";
import {FrontEndUserType} from "../../types/types";

type UserComponentPropsCallbackType = {
    isFollowInProgress : Array<number>
    followCallback : (id : number) => void;
    unfollowCallback : (id : number) => void;
};

type UserComponentPropsType = FrontEndUserType & UserComponentPropsCallbackType;
const User : FC<UserComponentPropsType> = ({id, isFollowed, photos, name, status, isFollowInProgress, followCallback, unfollowCallback}) => {
    return (<div key={id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + id}>
                                <img className={cssModule.userPhoto}
                                     src={photos.small != null ? photos.small : noAvatar}/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                isFollowed
                                    ? <button disabled={isFollowInProgress.some(currentId => currentId === id)}
                                                onClick={
                                        () => {
                                                    unfollowCallback(id);
                                                }
                                    }>Unfollow</button>

                                    : <button disabled={isFollowInProgress.some(currentId => currentId === id)}
                                        onClick={
                                    () => {
                                            followCallback(id);
                                    }
                                }>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                {name}
                            </div>
                            <div>
                                {status}
                             </div>
                        </span>
                        <span>
                            <div>
                                {"x.location.country"}
                            </div>
                            <div>
                                {"x.location.city"}
                            </div>
                        </span>
                    </span>
    </div>);
}

export default User;