import React from "react";
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


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);
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
            />
        </>);
    }
}

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

export default compose(connect(mapStateToProps, {follow,unfollow : unfollowThunkCreator, setCurrentPage : setCurrentPageActionCreator, getUsers:getUsersThunkCreator}),
    withAuthRedirect
)(UsersContainer);


