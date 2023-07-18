import React from "react";
import Paginator from "./Paginator";
import User from "./User";
// create single user component also
const Users = ({currentPage, pageChanged, totalUsersCount, pageSize, ...props}) => {
    return (
        <div>
            <Paginator pageChanged={pageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            {
                props.users.map(x => (
                    <User id={x.id}
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