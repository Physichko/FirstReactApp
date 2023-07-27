import React, {Component, Suspense} from "react";
import './App.css';
import Nav from "./components/Navbar/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
/*import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";*/
import HeaderContrainer from "./components/Header/HeaderContrainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/Common/Preloader";
import {appInitializedThunkCreator} from "./redux/appReducer";
import store from "./redux/reduxStore";

const DialogsContainer = React.lazy(() => {
    return import("./components/Dialogs/DialogsContainer");
}) ;

const ProfileContainer = React.lazy(() => {
    return  import("./components/Profile/ProfileContainer");
}) ;

const UsersContainer = React.lazy(() => {
    return  import("./components/Users/UsersContainer");
}) ;

const Login = React.lazy(() => {
    return  import("./components/Login/Login");
}) ;

class App extends Component {
    componentDidMount() {
        this.props.appInitialized();
    }

    render() {

        if(!this.props.isInitialized)
            return <Preloader />
        return (
            <div className="app-wrapper">
                <HeaderContrainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                            <Route path="/login/" element={<Login/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/users/" element={<UsersContainer/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isInitialized : state.app.isInitialized,
    }
}
let AppWithConnect = connect(mapStateToProps, {appInitialized:appInitializedThunkCreator})(App);
let SocialNetworkApp = (props) => {
    return  (<React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppWithConnect />
            </Provider>
        </BrowserRouter>
        </React.StrictMode>
    );
}
export default SocialNetworkApp;
