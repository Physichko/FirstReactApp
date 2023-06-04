import './App.css';
import Nav from "./components/Navbar/Nav";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContrainer from "./components/Header/HeaderContrainer";

const App = (props) => {
    return (
            <div className="app-wrapper">
                <HeaderContrainer />
                <Nav />
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
{/*                        <Route path="/profile/*" element={} />*/}
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users/" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
