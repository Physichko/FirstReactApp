import {cssModule} from "./Users.module.css";

const Users = (props) => {
    return (
        <div>
            {
                props.users.map(x => <div key={x.id}>
                    <span>
                        <div>
                            <img />
                        </div>
                        <div>
                            <button />
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                {x.fullName}
                            </div>
                            <div>
                                {x.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {x.location.country}
                            </div>
                            <div>
                                {x.location.city}
                            </div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default Users;