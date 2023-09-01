import cssModule from "./Users.module.css";
import React from "react";
import Paginator from "./Paginator";
import User from "./User";
// create single user component also
const Users = ({currentPage, pageChanged, totalUsersCount, pageSize, ...props}) => {
    return (
        <div className={cssModule.container}>
            <Paginator pageChanged={pageChanged} currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            {
                props.users.map(x => (
                    <User key={x.id}
                          id={x.id}
                          name={x.name}
                          status={x.status}
                          photos={x.photos}
                          followed={x.followed}
                          isFollowInProgress={props.isFollowInProgress}
                          follow={props.follow}
                          unfollow={props.unfollow}
                    />
                ))
            }
        </div>
    );
}

export default Users;