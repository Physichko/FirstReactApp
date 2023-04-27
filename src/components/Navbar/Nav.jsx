import cssModule from "./Nav.module.css";
const Nav = () => {
    return (
        <nav className={`${cssModule.nav} ${cssModule.item}`}>
            <div>
                <a>Profile</a>
            </div >
            <div>
                <a>Messages</a>
            </div>
            <div>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
        </nav>
    );
}

export default Nav;