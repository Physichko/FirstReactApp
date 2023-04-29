import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <Nav />
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/profile" Component={Profile}/>
                        <Route path="/dialogs/*" Component={Dialogs}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
