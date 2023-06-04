import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileActionCreator} from "../../redux/profileReducer";
import {useParams } from 'react-router-dom';

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.router.userId;
        if (!userId) userId = 2;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUsersProfile(response.data);
            });
        debugger;
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}
let mapStateToProps = (state) => ({
    profile : state.profilePage.profile
});

let mapDispatchToProps = (dispatch) => ({
    setUsersProfile : (profile) => {
        let action = setUserProfileActionCreator(profile);
        dispatch(action);
    }
});

export function withRouter(ComponentToAddRouter) {
    function ComponentWithRouterProp(props) {
        const params = useParams();

        return <ComponentToAddRouter {...props} router={params} />;
    }

    return ComponentWithRouterProp;
}

let profileContainerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(profileContainerWithRouter);