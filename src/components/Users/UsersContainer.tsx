import React, {FC, useEffect} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    usersReducerActionCreators,
    getUsersThunkCreator,
    unfollowThunkCreator,
    followThunkCreator,
} from "../../redux/usersReducer";
import Preloader from "../Common/Preloader";
// @ts-ignore
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
import {FrontEndUserType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type MapStateToPropsType = {
    currentPage : number;
    pageSize : number;
    isFetching : boolean;
    totalUsersCount : number;
    users : Array<FrontEndUserType>
    isFollowInProgress : Array<number>
}

type MapDispatchToPropsType = {
    followCallback : (id : number) => void;
    unfollowCallback : (id : number) => void;
    getUsers : (currentPage : number, pageSize : number) => void;
    setCurrentPage : (pageNumber : number) => void;
}

type OwnProps = {

}

type UsersContainerProps = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const UsersContainer : FC<UsersContainerProps> = ({currentPage, pageSize, isFetching, totalUsersCount, users, isFollowInProgress, followCallback, unfollowCallback, getUsers, setCurrentPage}) => {

    useEffect(() => {
        getUsers(currentPage,pageSize);
    },[]);

    const onPageChangedCallback = (pageNumber : number) => {
        setCurrentPage(pageNumber);
        getUsers(pageNumber,pageSize);
    }
    return (
    <>
        {
            isFetching ? <Preloader />  : null
        }
            <Users totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   users={users}
                   followCallback={followCallback}
                   unfollowCallback={unfollowCallback}
                   onPageChangedCallback={onPageChangedCallback}
                   isFollowInProgress={isFollowInProgress}
            />
    </>);
}

let mapStateToProps = (state : AppStateType) => {
    return {
        users : getUsersReselect(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage : getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowInProgress : getIsFollowInProgress(state),
    }
};

export default compose<React.Component>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {followCallback : followThunkCreator,unfollowCallback : unfollowThunkCreator, setCurrentPage : usersReducerActionCreators.setCurrentPageActionCreator, getUsers:getUsersThunkCreator})
    ,withAuthRedirect
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


