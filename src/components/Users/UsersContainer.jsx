import Users from "./Users";
import {connect} from "react-redux";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../../redux/usersReducer";

let mapStateToProps = (state) => {
    return {
        users : state.usersPage.users,
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)
