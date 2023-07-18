import './App.css';
import Nav from "./components/Navbar/Nav";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContrainer from "./components/Header/HeaderContrainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./components/Common/Preloader";
import {appInitializedThunkCreator} from "./redux/appReducer";

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
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/login/" element={<Login/>}/>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users/" element={<UsersContainer/>}/>
                    </Routes>
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
export default connect(mapStateToProps, {appInitialized:appInitializedThunkCreator})(App);
