import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Nav";
import Profile from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
    return (
            <div className="app-wrapper">
                <Header />
                <Nav />
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/" element={<Profile/>}/>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users/" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
