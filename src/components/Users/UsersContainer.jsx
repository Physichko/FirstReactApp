import React, {useEffect} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    setCurrentPageActionCreator,
    getUsersThunkCreator,
    unfollowThunkCreator,
    follow,
} from "../../redux/usersReducer";
import Preloader from "../Common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersReselect
} from "../../redux/usersSelectors";


const UsersContainer = (props) => {

    useEffect(() => {
        props.getUsers(props.currentPage,props.pageSize);
    },[]);

    const onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.getUsers(pageNumber,props.pageSize);
    }
    return (
    <>
        {
            props.isFetching ? <Preloader />  : null
        }
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   pageChanged={onPageChanged}
                   isFollowInProgress={props.isFollowInProgress}
            />
    </>);
}

let mapStateToProps = (state) => {
    return {
        users : getUsersReselect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage : getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowInProgress : getIsFollowInProgress(state),
    }
};

export default compose(connect(mapStateToProps, {follow,unfollow : unfollowThunkCreator, setCurrentPage : setCurrentPageActionCreator, getUsers:getUsersThunkCreator}),
    withAuthRedirect
)(UsersContainer);


/*let mapStateToProps = (state) => {
    return {
        users : state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage : state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowInProgress : state.usersPage.isFollowInProgress,
    }
};*/

// This works but below the same logic but with easier implementation
/*let mapDispatchToProps = (dispatch) => {
    return{
        unfollow : (userId) => {
            let thunk = unfollowThunkCreator(userId);
            dispatch(thunk);
        },
        follow : (userId) => {
            let thunk = follow(userId);
            dispatch(thunk);
        },
        setCurrentPage : (clickedPage) => {
            let action = setCurrentPageActionCreator(clickedPage);
            dispatch(action);
        },
        getUsers : (currentPage, pageSize) => {
            let thunk = getUsersThunkCreator(currentPage, pageSize);
            dispatch(thunk);
        },
    }
}*/


