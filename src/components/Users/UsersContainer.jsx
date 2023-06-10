import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setToggleIsFetchingActionCreator,
    setToggleIsFollowInProgressActionCreator,
    setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../redux/usersReducer";
import Preloader from "../Common/Preloader";
import {usersApi} from "../../api/api";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setToggleIsFetching(true);
        usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount)
            this.props.setToggleIsFetching(false);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.setToggleIsFetching(true);
        usersApi.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
                this.props.setToggleIsFetching(false);
            });
    }
    render() {
        return (
        <>
            {
                this.props.isFetching ? <Preloader />  : null
            }
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      pageChanged={this.onPageChanged}
                      isFollowInProgress={this.props.isFollowInProgress}
                      setToggleIsInProgress={this.props.setToggleIsFollowInProgress}
            />
        </>);
    }
}

let mapStateToProps = (state) => {
    return {
        users : state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage : state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowInProgress : state.usersPage.isFollowInProgress,
    }
};

let mapDispatchToProps = (dispatch) => {
    return{
        follow : (userId) =>{
            let action = followActionCreator(userId);
            dispatch(action);
        },
        unfollow : (userId) =>{
            let action = unfollowActionCreator(userId);
            dispatch(action);
        },
        setUsers : (users) =>{
            let action = setUsersActionCreator(users);
            dispatch(action);
        },
        setTotalUsersCount : (count) => {
            let action = setTotalUsersCountActionCreator(count);
            dispatch(action);
        },
        setCurrentPage : (clickedPage) => {
            let action = setCurrentPageActionCreator(clickedPage);
            dispatch(action);
        },
        setToggleIsFetching : (isFetching) => {
            let action = setToggleIsFetchingActionCreator(isFetching);
            dispatch(action);
        },
        setToggleIsFollowInProgress : (isFollowInProgress, userId) => {
            let action = setToggleIsFollowInProgressActionCreator(isFollowInProgress,userId);
            dispatch(action);
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)


//mapdispatchtoprops = {follow:followActionCreator}