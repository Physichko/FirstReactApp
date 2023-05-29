import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Nav";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = (props) => {
    return (
            <div className="app-wrapper">
                <Header />
                <Nav />
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile/*" element={<ProfileContainer/>}/>
{/*                        <Route path="/profile/*" element={} />*/}
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users/" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
    );
}

export default App;
