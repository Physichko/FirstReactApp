import {NavLink} from "react-router-dom";
import cssModule from "./Users.module.css";
import noAvatar from "../../assets/images/images.png";
import React from "react";

const User = ({id, followed, photos, name, status, isFollowInProgress, follow, unfollow, ...props}) => {
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
                                followed
                                    ? <button disabled={isFollowInProgress.some(currentId => currentId === id)}
                                                onClick={
                                        () => {
                                                    unfollow(id);
                                                }
                                    }>Unfollow</button>

                                    : <button disabled={isFollowInProgress.some(currentId => currentId === id)}
                                        onClick={
                                    () => {
                                            follow(id);
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