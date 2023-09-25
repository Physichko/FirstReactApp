import cssModule from "./Users.module.css";
import React from "react";
import Paginator from "./Paginator";
import {FrontEndUserType} from "../../types/types";
import User from "./User";

type UsersProps = {
    users : Array<FrontEndUserType>;
    currentPage: number;
    onPageChangedCallback : (x : number) => void;
    totalUsersCount : number;
    pageSize : number;
    isFollowInProgress : Array<number>
    followCallback : (id : number) => void;
    unfollowCallback : (id : number) => void;
}
const Users : React.FC<UsersProps> = ({users,currentPage, onPageChangedCallback, totalUsersCount, pageSize,isFollowInProgress, followCallback, unfollowCallback}) => {
    return (
        <div className={cssModule.container}>
            <Paginator onPageChangedCallback={onPageChangedCallback} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            {
                users.map(x => (
                    <User key={x.id}
                          id={x.id}
                          name={x.name}
                          status={x.status}
                          photos={x.photos}
                          isFollowed={x.isFollowed}
                          isFollowInProgress={isFollowInProgress}
                          followCallback={followCallback}
                          unfollowCallback={unfollowCallback}
                    />
                ))
            }
        </div>
    );
}

export default Users;